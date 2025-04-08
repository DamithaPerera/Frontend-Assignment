import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ApiDetails } from '../components/ApiDetails';
import { ApiDetail } from '../types/api';
import { Button } from '../components/Button';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
`;


export const ApiDetailsPage: React.FC = () => {
    const location = useLocation<{ api: ApiDetail }>();
    const history = useHistory();
    const api = location.state?.api;

    if (!api) {
        return (
            <Container>
                <p>No API details available. Please select an API from the Home screen.</p>
                <Button label="Go Back" onClick={() => history.push('/')} />
            </Container>
        );
    }

    return (
        <Container>
            <Button label="Back to Home" onClick={() => history.push('/')} />
            <ApiDetails api={api} />
        </Container>
    );
};
