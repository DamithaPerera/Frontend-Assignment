import { ProvidersResponse, ProviderApisResponse, ApiDetail } from '../types/api';

export class ApiService {
    // Fetch providers and return the array from the "data" property.
    async getProviders(): Promise<string[]> {
        try {
            const response = await fetch('https://api.apis.guru/v2/providers.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch providers: ${response.statusText}`);
            }
            const data: ProvidersResponse = await response.json();
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Fetch provider APIs and transform raw data into ApiDetail array.
    async getProviderApis(providerName: string): Promise<ApiDetail[]> {
        try {
            const response = await fetch(`https://api.apis.guru/v2/${providerName}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch provider APIs for ${providerName}: ${response.statusText}`);
            }
            const data: ProviderApisResponse = await response.json();

            // Transform each API detail entry to match our UI requirements.
            const apiList: ApiDetail[] = Object.entries(data.apis).map(([key, rawApi]) => ({
                name: rawApi.info.title || key, // Use title if available, fallback to the key.
                description: rawApi.info.description,
                link: rawApi.link,
            }));
            return apiList;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
