import axios from "axios";

export const axiosClient = axios.create({
    baseURL : "http://localhost:8085/", // this will be a common host to be called
    timeout: 10000,
    headers: {
        "Content-Type" : "application/json"
    }
});

/**
 * any request from the client will be intercepted first, and Authorization token will be added to all the requests
 */
axiosClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");
        // if(token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response)=> response,
    (error) => {
        if(error.response) {
           if (error.response.status === 401) {
                console.warn("Unauthorized! Redirecting to login...");
            } 
        } else if( error.request) {
            console.error("No response from sever")
        } else {
            console.error("Error setting up request:", error.message);
        }
      return Promise.reject(error);
    }
);