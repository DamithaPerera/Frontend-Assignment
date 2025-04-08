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

    // Memoize the ApiService instance so that it's stable across renders.
    const apiService = useMemo(() => new ApiService(), []);

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

    const fetchProviderApis = useCallback(
        async (provider: string) => {
            setLoadingApis(true);
            setError('');
            try {
                const data = await apiService.getProviderApis(provider);
                const apiList = Object.values(data.apis);
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

    const handleProviderSelect = (provider: string) => {
        setSelectedProvider(provider);
        fetchProviderApis(provider);
    };

    const handleApiSelect = (api: ApiDetail) => {
        // Navigate to the API Details screen.
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
