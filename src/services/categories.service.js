import api from './http'

export const getCategories = async () => (await api.get('/categories')).data
