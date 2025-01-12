// Types for API error responses
export interface ApiErrorResponse {
    detail?: string;
    non_field_errors?: string[];

    [key: string]: string | string[] | undefined;
}