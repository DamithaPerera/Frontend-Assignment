import {ProviderApisResponse, ProvidersResponse} from "../types/api";

export class ApiService {
    // Fetches the list of provider names.
    async getProviders(): Promise<string[]> {
        try {
            const response = await fetch('https://api.apis.guru/v2/providers.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch providers: ${response.statusText}`);
            }
            const data: ProvidersResponse = await response.json();
            // The provider names are the object keys.
            return Object.keys(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Fetches all the APIs for a given provider.
    async getProviderApis(providerName: string): Promise<ProviderApisResponse> {
        try {
            const response = await fetch(`https://api.apis.guru/v2/${providerName}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch provider APIs for ${providerName}: ${response.statusText}`);
            }
            const data: ProviderApisResponse = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
