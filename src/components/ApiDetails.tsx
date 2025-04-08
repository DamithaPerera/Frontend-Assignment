import React from 'react';
import styled from 'styled-components';
import { ApiDetail } from '../types/api';

const Container = styled.div`
  padding: 16px;
`;

interface ApiDetailsProps {
    api: ApiDetail;
}

export const ApiDetails: React.FC<ApiDetailsProps> = ({ api }) => {
    return (
        <Container>
            <h2>{api.name}</h2>
            {api.description && <p>{api.description}</p>}
            {/* Additional details can be rendered here */}
        </Container>
    );
};
