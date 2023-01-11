export interface SearchResult {
    description?: string;
    isDoc?: boolean;
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
