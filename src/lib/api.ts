import axios from 'axios'

// Build-time env (Vite) + safe fallback — no 'process' needed
const BASE_URL: string =
  ((import.meta as any)?.env?.VITE_API_BASE_URL as string) ||
  'http://localhost:5174'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

