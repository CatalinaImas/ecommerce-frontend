// Convierte un objeto en FormData para poder enviar archivos (imágenes) al backend.
// Se omiten los valores vacíos para no pisar datos existentes.
export function toFormData(data) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    formData.append(key, value)
  })
  return formData
}
