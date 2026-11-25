import api from './http'
import { toFormData } from '../utils/formData'

export const getProducts = async () => (await api.get('/products')).data

export const getProductById = async (id) => (await api.get(`/products/${id}`)).data

// Se envían como FormData porque incluyen la imagen
export const createProduct = async (data) =>
  (await api.post('/products', toFormData(data))).data

export const updateProduct = async (id, data) =>
  (await api.put(`/products/${id}`, toFormData(data))).data

export const deleteProduct = async (id) => (await api.delete(`/products/${id}`)).data
