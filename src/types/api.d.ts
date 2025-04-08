// Defines types for the providers and API details

export interface ProvidersResponse {
    // The providers API returns an object whose keys are provider names.
    [providerName: string]: any;
}

export interface ApiDetail {
    name: string;
    description?: string;
    // Extend with additional fields as needed.
}

export interface ProviderApisResponse {
    // The provider detail response contains an "apis" object.
    apis: {
        [apiName: string]: ApiDetail;
    };
}
