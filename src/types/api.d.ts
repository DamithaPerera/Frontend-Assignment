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
        contact?: {
            name?: string;
            email?: string;
            url?: string;
            'x-twitter'?: string;
        };
        'x-apisguru-categories'?: string[];
        'x-logo'?: {
            url: string;
        };
        'x-origin'?: {
            format: string;
            url: string;
            version: string;
        }[];
        'x-providerName'?: string;
        'x-serviceName'?: string;
        'x-unofficialSpec'?: boolean;
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
    version?: string;
    contact?: {
        name?: string;
        email?: string;
        url?: string;
        twitter?: string;
    };
    categories?: string[];
    logo?: string;
    origin?: {
        format: string;
        url: string;
        version: string;
    }[];
    providerName?: string;
    serviceName?: string;
    unofficialSpec?: boolean;
    added?: string;
    updated?: string;
    swaggerUrl?: string;
    swaggerYamlUrl?: string;
    openapiVer?: string;
    link?: string;
}

