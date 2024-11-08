import axios, { AxiosInstance } from "axios";
import SecureStore from 'expo-secure-store';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.1.213:9090/tc/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    },   
})