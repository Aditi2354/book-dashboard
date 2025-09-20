import axios from 'axios'

const BASE_URL =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  'http://localhost:5174'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})
