// import axios from "axios";

// const url = "https://localhost:8081/api"; // Replace with your backend's base URL

// const api = axios.create({
//     baseURL: url,
//     withCredentials: true, // Include cookies in requests
// });

// // Register a new user
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${url}/user/register`, userData);

//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// // Login a user
// export const loginUser = async (loginData) => {
//   try {
//     const response = await axios.post(`${url}/user/login`, loginData);
//     // console.log(response)
//     console.log(response.data.token)
//     jwtToken = response.data.token
//     sessionStorage.setItem("token", jwtToken);
//     return response.data;
    
//   } catch (error) {
//     throw error.response.data;
//   }
// };