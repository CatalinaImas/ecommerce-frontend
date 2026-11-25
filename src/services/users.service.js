import api from './http'
import { toFormData } from '../utils/formData'

export const loginUser = async (credentials) =>
  (await api.post('/users/login', credentials)).data

export const getUsers = async () => (await api.get('/users')).data

export const getUserById = async (id) => (await api.get(`/users/${id}`)).data

export const createUser = async (data) => (await api.post('/users', toFormData(data))).data

export const updateUser = async (id, data) =>
  (await api.put(`/users/${id}`, toFormData(data))).data

export const deleteUser = async (id) => (await api.delete(`/users/${id}`)).data
