// The response for the providers API:
export interface ProvidersResponse {
    data: string[];
}

// The raw API detail as returned by the API:
export interface RawApiDetail {
    added: string;
    info: {
        title: string;
        description?: string;
        version?: string;
        // ... other fields if necessary
    };
    updated: string;
    swaggerUrl: string;
    swaggerYamlUrl: string;
    openapiVer: string;
    link: string;
}

// The response for provider APIs:
export interface ProviderApisResponse {
    apis: {
        [apiKey: string]: RawApiDetail;
    };
}

// The transformed API detail that our UI will use:
export interface ApiDetail {
    name: string;
    description?: string;
    link?: string;
}
