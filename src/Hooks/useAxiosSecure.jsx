import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/Provider/AuthProviders";

const axiosSecure = axios.create({
    baseURL: 'https://my-varsity-projects-server.onrender.com'
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor - add token to every request
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - handle 401 and 403 errors
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const status = error.response?.status;
                
                // Handle unauthorized or forbidden access
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate('/login');
                }
                
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;