import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Home } from '../pages/Home';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as ApiServiceModule from '../services/ApiService';

jest.mock('../services/ApiService');

const mockProviders = ['amazonaws.com', 'adobe.com'];
const mockApis = {
    apis: {
        'Test API 1': { name: 'Test API 1', description: 'Description 1' },
        'Test API 2': { name: 'Test API 2', description: 'Description 2' },
    },
};

describe('Home Page', () => {
    beforeEach(() => {
        // @ts-ignore
        ApiServiceModule.ApiService.mockImplementation(() => ({
            getProviders: jest.fn().mockResolvedValue(mockProviders),
            getProviderApis: jest.fn().mockResolvedValue(mockApis),
        }));
    });

    it('renders button and loads providers', async () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Home />
            </Router>
        );
        expect(screen.getByText(/Open Providers/i)).toBeInTheDocument();
        // Open the sidebar
        fireEvent.click(screen.getByText(/Open Providers/i));
        // Wait for providers to load
        await waitFor(() => {
            expect(screen.getByText(mockProviders[0])).toBeInTheDocument();
        });
    });

    it('selects a provider and loads APIs', async () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Home />
            </Router>
        );
        // Open providers sidebar
        fireEvent.click(screen.getByText(/Open Providers/i));
        await waitFor(() => {
            expect(screen.getByText(mockProviders[0])).toBeInTheDocument();
        });
        // Select a provider
        fireEvent.click(screen.getByText(mockProviders[0]));
        await waitFor(() => {
            expect(screen.getByText(`APIs for ${mockProviders[0]}`)).toBeInTheDocument();
        });
        // Check that API list items are rendered
        expect(screen.getByText('Test API 1')).toBeInTheDocument();
        expect(screen.getByText('Test API 2')).toBeInTheDocument();
    });
});
