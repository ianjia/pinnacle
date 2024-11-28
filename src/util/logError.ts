import axios from "axios";

export function logError(error: unknown) {
    if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
            // Handle 404 error
            console.error(`Error 404: ${error.message}`);
        } else {
            // Handle other HTTP errors
            console.error("HTTP error occurred:", error.response?.status, error.message);
        }
    } else {
        // Handle non-Axios errors (unlikely in this context)
        console.error("An unexpected error occurred:", error);
    }
}
