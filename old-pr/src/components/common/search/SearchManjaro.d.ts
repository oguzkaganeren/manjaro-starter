export interface SearchResult {
    description?: string;
    'is_doc'?: boolean;
    package?: string;
    title?: string;
    type?: string;
    url?: string;
}
export interface SearchManjaro {
    status?: number;
    resultsFound?: number;
    contentType?: string;
    'search-results'?: SearchResult[];
}

export interface SearchInterface {
    description?: string;
    isDoc?: boolean;
    pkg?: string;
    title?: string;
    type?: string;
    url?: string;
}
