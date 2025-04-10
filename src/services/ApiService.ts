import {ProvidersResponse, ApiDetail, RawApiDetail} from '../types/api';

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
            const data = await response.json();

            return Object.entries(data.apis).map(([_, raw]) => {
                const r = raw as RawApiDetail;

                return {
                    name: r.info.title,
                    description: r.info.description,
                    version: r.info.version,
                    contact: {
                        name: r.info.contact?.name,
                        email: r.info.contact?.email,
                        url: r.info.contact?.url,
                        twitter: r.info.contact?.['x-twitter'],
                    },
                    categories: r.info['x-apisguru-categories'],
                    logo: r.info['x-logo']?.url,
                    origin: r.info['x-origin'],
                    providerName: r.info['x-providerName'],
                    serviceName: r.info['x-serviceName'],
                    unofficialSpec: r.info['x-unofficialSpec'],
                    added: r.added,
                    updated: r.updated,
                    swaggerUrl: r.swaggerUrl,
                    swaggerYamlUrl: r.swaggerYamlUrl,
                    openapiVer: r.openapiVer,
                    link: r.link,
                };
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
