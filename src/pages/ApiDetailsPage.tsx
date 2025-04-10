import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ApiDetails } from '../components/ApiDetails';
import { ApiDetail } from '../types/api';
import { Button } from '../components/Button';

const Container = styled.div`
    padding: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;


export const ApiDetailsPage: React.FC = () => {
    // Expecting state to contain the selected API and optionally the provider
    const location = useLocation<{ api: ApiDetail; provider?: string }>();
    const history = useHistory();
    const api = location.state?.api;
    const provider = location.state?.provider;

    if (!api) {
        return (
            <Container>
                <p>No API details available. Please select an API from the Home screen.</p>
                <Button label="Go Back" onClick={() => history.push('/')} />
            </Container>
        );
    }

    const exploreMore = () => {
        history.push({
            pathname: '/',
            state: { provider },
        });
    };

    return (
        <Container>
            <ButtonContainer>
            </ButtonContainer>
            <ApiDetails />
        </Container>
    );
};
