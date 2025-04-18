// Use the VITE_ prefix for Vite projects, REACT_APP_ for Create React App
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorData;
    try {
        // Try to parse error response from backend
        errorData = await response.json();
    } catch (e) {
        // If parsing fails, use status text
        errorData = { message: response.statusText || 'An unknown network error occurred' };
    }
    console.error("API Error:", response.status, errorData);
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  // Handle 204 No Content or other non-JSON success responses
   const contentType = response.headers.get("content-type");
   if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
       return null; // Or return { success: true } if needed
   }

  return response.json(); // Parse JSON body for successful responses
}
// https://localhost:8081/api/User/register
export const loginUser = async (credentials) => {
  // Make sure this endpoint matches your C# backend route
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Explicitly accept JSON
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const registerUser = async (userData) => {
  // Make sure this endpoint matches your C# backend route
  console.log(userData)
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
    },
    body: JSON.stringify(userData), // Send necessary registration fields
  });
   // Register might return 201 Created or 204 No Content on success
   // handleResponse will manage this based on status and content-type
  return handleResponse(response);
};