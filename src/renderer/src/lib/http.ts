import axios from 'axios'
import { apiBaseUrl } from './apiEndpoints'

export const api = axios.create({
  baseURL: apiBaseUrl
})
