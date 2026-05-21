// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api", // your backend base URL
// });

// // Add JWT token to requests
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`// your backend base URL
});

// Add JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token --------------> ", token);
  if (token) {
     config.headers.Authorization = `Bearer ${token}`;

     console.log("Added Authorization header:", config.headers.Authorization);
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;