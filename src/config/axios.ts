import axios from 'axios'

export const baseApi = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/v1',
})