import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Sidebar';
import { ApiList } from '../components/ApiList';
import { ApiDetail } from '../types/api';
import { ApiService } from '../services/ApiService';
import { useHistory } from 'react-router-dom';

const FullScreenWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2c5877;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const ExploreButton = styled.button`
    padding: 10px 18px;
    background-color: #00aef1;
    color: white;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-family: 'Segoe UI', sans-serif;

    &:hover {
        background-color: #009ad3;
    }
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

    const handleProviderSelect = (provider: string) => {
        setSelectedProvider(provider);
        fetchProviderApis(provider);
        setSidebarOpen(false);
    };

    const handleApiSelect = (api: ApiDetail) => {
        history.push({ pathname: '/api-details', state: { api } });
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
            {!selectedProvider ? (
                <FullScreenWrapper>
                    <ExploreButton onClick={() => setSidebarOpen(true)}>
                        Explore web APIs
                    </ExploreButton>
                </FullScreenWrapper>
            ) : (
                <div style={{ marginLeft: sidebarOpen ? '300px' : '0', padding: '16px' }}>
                    <h2 style={{ color: '#1e2a38' }}>APIs for {selectedProvider}</h2>
                    {loadingApis ? (
                        <p>Loading APIs...</p>
                    ) : (
                        <ApiList apis={apis} onSelectApi={handleApiSelect} />
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </>
    );
};
