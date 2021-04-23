import axios from 'axios';
import { env } from './environment'

const { backend } = env

const axiosInstance = axios.create({
  baseURL: backend.url,
  timeout: 1000,
})


export default axiosInstance