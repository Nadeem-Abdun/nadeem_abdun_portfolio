export interface RequestOptions {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers?: Record<string, string>; // Optional headers for the request
    body?: any; // The payload for the request, can be JSON or FormData
    isFormData?: boolean; // Indicates if the body should be treated as FormData
    credentials?: "include" | "same-origin"; // Optional credentials for the request
    // Use "same-origin" when your frontend and backend are on the same origin (same scheme, host, and port).
    // Use "include" when your frontend and backend are on different origins (different scheme, host, or port).
}

export const CommunicationModule = async (endpoint: string, options: RequestOptions) => {
    const { method, headers = {}, body, isFormData = false, credentials } = options;
    // Prepare the configuration for the fetch request
    const config: RequestInit = {
        method,
        headers: isFormData ? headers : {
            "Content-Type": "application/json", // Default to JSON if not form data
            ...headers,
        },
        credentials: credentials || 'same-origin', // Default to 'same-origin' if not specified
    };
    // Set the request body
    if (body) {
        // If isFormData is true, use the body as-is (typically a FormData object).
        // Otherwise, stringify the body to send as JSON.
        config.body = isFormData ? body : JSON.stringify(body);
    }
    // Include credentials if specified
    if (credentials) {
        config.credentials = credentials;
    }
    try {
        // Make the API request
        const response = await fetch(endpoint, config);
        // Parse the JSON response
        const data = await response.json();
        // Check if the response was not successful
        if (!response.ok) {
            console.error(data.message || "Something went wrong with the API response.");
        }
        // Return the parsed data
        return data;
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};