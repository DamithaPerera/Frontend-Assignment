import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Sidebar } from '../components/Sidebar';
import { ApiList } from '../components/ApiList';
import { ApiDetail } from '../types/api';
import { ApiService } from '../services/ApiService';
import { useHistory } from 'react-router-dom';

interface ContainerProps {
    openSidebar: boolean;
}

const Container = styled.div<ContainerProps>`
    margin-left: ${(props) => (props.openSidebar ? '250px' : '0')};
    transition: margin-left 0.3s ease;
    padding: 16px;
`;

export const Home: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [providers, setProviders] = useState<string[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [apis, setApis] = useState<ApiDetail[]>([]);
    const [loadingProviders, setLoadingProviders] = useState<boolean>(false);
    const [loadingApis, setLoadingApis] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const history = useHistory();

    // Use useMemo so the ApiService instance is not recreated on each render.
    const apiService = useMemo(() => new ApiService(), []);

    // Fetches providers from the API and stores the array from the "data" property.
    const fetchProviders = useCallback(async () => {
        setLoadingProviders(true);
        setError('');
        try {
            const providersList = await apiService.getProviders();
            setProviders(providersList);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoadingProviders(false);
        }
    }, [apiService]);

    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    // Fetches APIs for a given provider and transforms the data for display.
    const fetchProviderApis = useCallback(
        async (provider: string) => {
            setLoadingApis(true);
            setError('');
            try {
                // getProviderApis now returns a transformed array of ApiDetail objects.
                const apiList: ApiDetail[] = await apiService.getProviderApis(provider);
                if (apiList.length === 0) {
                    setError('No APIs found for this provider.');
                }
                setApis(apiList);
            } catch (err) {
                setError((err as Error).message);
                setApis([]);
            } finally {
                setLoadingApis(false);
            }
        },
        [apiService]
    );

    // Handle when a provider is selected from the sidebar.
    const handleProviderSelect = (provider: string) => {
        setSelectedProvider(provider);
        fetchProviderApis(provider);
        setSidebarOpen(false);
    };

    // Handle selecting a specific API from the list.
    const handleApiSelect = (api: ApiDetail) => {
        history.push({
            pathname: '/api-details',
            state: { api },
        });
    };

    return (
        <>
            {sidebarOpen && (
                <Sidebar
                    providers={providers}
                    onSelectProvider={handleProviderSelect}
                    closeSidebar={() => setSidebarOpen(false)}
                />
            )}
            <Container openSidebar={sidebarOpen}>
                <Button label="Open Providers" onClick={() => setSidebarOpen(true)} />
                {loadingProviders && <p>Loading providers...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {selectedProvider && (
                    <>
                        <h2>APIs for {selectedProvider}</h2>
                        {loadingApis ? (
                            <p>Loading APIs...</p>
                        ) : (
                            <ApiList apis={apis} onSelectApi={handleApiSelect} />
                        )}
                    </>
                )}
            </Container>
        </>
    );
};
