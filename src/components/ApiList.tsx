import React from 'react';
import styled from 'styled-components';
import { ApiDetail } from '../types/api';

const ListContainer = styled.div`
  padding: 16px;
`;

const ListItem = styled.div`
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface ApiListProps {
    apis: ApiDetail[];
    onSelectApi: (api: ApiDetail) => void;
}

export const ApiList: React.FC<ApiListProps> = ({ apis, onSelectApi }) => {
    return (
        <ListContainer>
            {apis.map((api) => (
                <ListItem key={api.name} onClick={() => onSelectApi(api)}>
                    <h3>{api.name}</h3>
                    {api.description && <p>{api.description}</p>}
                </ListItem>
            ))}
        </ListContainer>
    );
};
