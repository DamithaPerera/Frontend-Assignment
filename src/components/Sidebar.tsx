import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  padding: 16px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
`;

interface SidebarProps {
    providers: string[];
    onSelectProvider: (provider: string) => void;
    closeSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ providers, onSelectProvider, closeSidebar }) => {
    return (
        <SidebarContainer>
            <h2>API Providers</h2>
            <ul>
                {providers.map((provider) => (
                    <li
                        key={provider}
                        style={{ cursor: 'pointer', marginBottom: '8px' }}
                        onClick={() => {
                            onSelectProvider(provider);
                            closeSidebar();
                        }}
                    >
                        {provider}
                    </li>
                ))}
            </ul>
        </SidebarContainer>
    );
};
