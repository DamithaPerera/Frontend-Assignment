import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApiDetailsPage } from '../pages/ApiDetailsPage';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('ApiDetailsPage', () => {
    it('shows no API details message when API data is missing', () => {
        const history = createMemoryHistory();
        history.push('/api-details', {}); // Passing empty state.
        render(
            <Router history={history}>
                <ApiDetailsPage />
            </Router>
        );
        expect(screen.getByText(/No API details available/i)).toBeInTheDocument();
    });

    it('renders API details when API data is provided', () => {
        const mockApi = { name: 'Test API', description: 'Test API Description' };
        const history = createMemoryHistory();
        history.push('/api-details', { api: mockApi });
        render(
            <Router history={history}>
                <ApiDetailsPage />
            </Router>
        );
        expect(screen.getByText('Test API')).toBeInTheDocument();
        expect(screen.getByText('Test API Description')).toBeInTheDocument();
    });
});
