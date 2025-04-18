const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Re-use the handleResponse function (or import it if you split it out)
async function handleResponse(response) {
   if (!response.ok) {
    let errorData;
    try {
        errorData = await response.json();
         // Check for specific backend error structures if known
         // e.g., if (errorData.errors) { throw new Error(JSON.stringify(errorData.errors)) }
    } catch (e) {
        errorData = { message: response.statusText || 'An unknown network error occurred' };
    }
     // Special handling for 401 Unauthorized - could trigger logout
     if (response.status === 401) {
         console.error("Unauthorized request (401). Token may be invalid or expired.");
     }
    console.error("API Error:", response.status, errorData);
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
   const contentType = response.headers.get("content-type");
   if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
       return null;
   }
  return response.json();
}


// fetchWithAuth now takes the token directly as an argument
export const fetchWithAuth = async (urlPath, options = {}, token) => {
  if (!token) {
      // Decide how to handle: throw error, or allow request without auth?
      // Throwing an error is safer for protected resources.
      console.error("fetchWithAuth called without a token for URL:", urlPath);
      throw new Error("Authentication token is missing.");
      // Alternatively, proceed without the Authorization header for public endpoints called via this function
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers, // Allow overriding default headers or adding new ones
  };

  // Only add Authorization header if token is present
  if (token) {
      headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${urlPath}`, { // urlPath should start with /
    ...options,
    headers,
  });

  return handleResponse(response);
};

// Example function in products.js using fetchWithAuth:
/*
import { fetchWithAuth } from './apiClient';

export const getProtectedProducts = async (token) => {
  if (!token) return []; // Or throw error if products MUST be fetched with auth
  try {
    const data = await fetchWithAuth('/products/protected', { method: 'GET' }, token);
    return data || []; // Handle null response if API returns 204
  } catch (error) {
    console.error("Failed to fetch protected products:", error);
    // Handle error appropriately in the component (e.g., show message)
    // If it's a 401 error, the component might trigger logout.
    if (error.message.includes("401")) {
        // Potentially trigger logout action here if logout function is passed or available via context/event
    }
    return []; // Return empty array or throw error
  }
};

// Example for public products (doesn't need auth)
export const getPublicProducts = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/products/public`); // Assuming a public endpoint
      // Use a basic handler or reuse handleResponse if appropriate
       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
       const contentType = response.headers.get("content-type");
       if (contentType && contentType.includes("application/json")) {
           return await response.json();
       }
       return [];
  } catch (error) {
     console.error("Failed to fetch public products:", error);
     return [];
  }
}

*/