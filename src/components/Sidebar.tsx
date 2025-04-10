import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {RawApiDetail} from "../types/api";

interface ProviderMeta {
    title?: string;
    logo?: string;
}

interface SidebarProps {
    providers: string[];
    onSelectProvider: (provider: string) => void;
    closeSidebar: () => void;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9;
`;

const SidebarContainer = styled.div`
    width: 300px;
    background: linear-gradient(180deg, #375a7f, #2c3e50);
    padding: 16px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    overflow-y: auto;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const ProviderItem = styled.div`
    margin-bottom: 8px;
    border-radius: 6px;
    background-color: transparent;
`;

const DropdownHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const DropdownContent = styled.div`
    margin-top: 4px;
    background-color: #111;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #fff;
    transition: background-color 0.2s;
    &:hover {
        background-color: #222;
    }
`;

const Logo = styled.img`
    height: 28px;
    width: 28px;
    object-fit: contain;
    border-radius: 4px;
    background-color: white;
`;

const Chevron = styled.span<{ open: boolean }>`
    font-size: 16px;
    transform: rotate(${({ open }) => (open ? '90deg' : '0deg')});
    transition: transform 0.2s;
`;

const ProviderTitle = styled.div`
    font-weight: 500;
    font-size: 14px;
    color: #fff;
`;

export const Sidebar: React.FC<SidebarProps> = ({
                                                    providers,
                                                    onSelectProvider,
                                                    closeSidebar,
                                                }) => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [meta, setMeta] = useState<Record<string, ProviderMeta>>({});
    const history = useHistory();

    const handleToggle = async (provider: string) => {
        if (expanded === provider) {
            setExpanded(null);
            return;
        }
        setExpanded(provider);

        if (!meta[provider]) {
            try {
                const response = await fetch(`https://api.apis.guru/v2/${provider}.json`);
                const data = await response.json();
                const firstApi = Object.values(data.apis)[0] as any;
                const title = firstApi?.info?.title;
                const logo = firstApi?.info?.['x-logo']?.url;

                setMeta((prev) => ({ ...prev, [provider]: { title, logo } }));
            } catch (err) {
                console.error(`Failed to fetch metadata for ${provider}`);
            }
        }
    };

    const handleNavigateToApi = async (provider: string) => {
        try {
            const response = await fetch(`https://api.apis.guru/v2/${provider}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch provider APIs for ${provider}: ${response.statusText}`);
            }

            const data = await response.json();
            const [_, raw] = Object.entries(data.apis)[0] as [string, RawApiDetail];

            const api = {
                name: raw.info.title,
                description: raw.info.description,
                version: raw.info.version,
                contact: {
                    name: raw.info.contact?.name,
                    email: raw.info.contact?.email,
                    url: raw.info.contact?.url,
                    twitter: raw.info.contact?.['x-twitter'],
                },
                categories: raw.info['x-apisguru-categories'],
                logo: raw.info['x-logo']?.url,
                origin: raw.info['x-origin'],
                providerName: raw.info['x-providerName'],
                serviceName: raw.info['x-serviceName'],
                unofficialSpec: raw.info['x-unofficialSpec'],
                added: raw.added,
                updated: raw.updated,
                swaggerUrl: raw.swaggerUrl,
                swaggerYamlUrl: raw.swaggerYamlUrl,
                openapiVer: raw.openapiVer,
                link: raw.link,
            };

            history.push({
                pathname: '/api-details',
                state: { api, provider },
            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Overlay onClick={closeSidebar} />
            <SidebarContainer>
                <h3 style={{ color: '#ffffff', marginBottom: '16px' }}>Select Provider</h3>
                {providers.map((provider) => (
                    <ProviderItem key={provider}>
                        <DropdownHeader onClick={() => handleToggle(provider)}>
                            {provider}
                            <Chevron open={expanded === provider}>&#9654;</Chevron>
                        </DropdownHeader>
                        {expanded === provider && (
                            <DropdownContent onClick={() => handleNavigateToApi(provider)}>
                                {meta[provider]?.logo && (
                                    <Logo src={meta[provider].logo} alt={`${provider} logo`} />
                                )}
                                <ProviderTitle>{meta[provider]?.title || 'Loading...'}</ProviderTitle>
                            </DropdownContent>
                        )}
                    </ProviderItem>
                ))}
                <div style={{ marginTop: '20px' }}>
                    <button onClick={closeSidebar}>Close</button>
                </div>
            </SidebarContainer>
        </>
    );
};
