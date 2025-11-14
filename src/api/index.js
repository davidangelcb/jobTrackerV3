import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  // timeout: 10000, // opcional: tiempo de espera para las solicitudes
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    // Se puede agregar token si existe localmente
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error en la respuesta:', error.response.status, error.response.data)
    } else {
      console.error('Error de red o servidor no disponible:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
