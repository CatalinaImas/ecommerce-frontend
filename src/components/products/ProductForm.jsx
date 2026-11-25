import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const EMPTY = {
  name: '',
  price: '',
  description: '',
  category: '',
  stock: 0,
  image: '',
}

// Un mismo formulario para crear y para editar.
// Las categorías vienen del backend (prop "categories").
function ProductForm({ selectedProduct, categories, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY })

  const isEdit = Boolean(selectedProduct)

  // Cada vez que cambia el producto seleccionado, rellenamos (o vaciamos) el form
  useEffect(() => {
    reset(
      selectedProduct
        ? {
            name: selectedProduct.name,
            price: selectedProduct.price,
            description: selectedProduct.description,
            category: selectedProduct.category?._id ?? '',
            stock: selectedProduct.stock ?? 0,
            image: '', // el input de archivo no se puede rellenar
          }
        : EMPTY,
    )
  }, [selectedProduct, categories, reset])

  const submit = async (data) => {
    const { image, ...productData } = data
    // image es una FileList: tomamos el primer archivo (si hay)
    const ok = await onSubmit({ ...productData, image: image?.[0] })
    if (ok && !isEdit) reset(EMPTY)
  }

  return (
    <form className="form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            className={errors.name ? 'input-error' : ''}
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
              maxLength: { value: 60, message: 'El nombre no puede superar los 60 caracteres' },
            })}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            className={errors.price ? 'input-error' : ''}
            {...register('price', {
              required: 'El precio es obligatorio',
              min: { value: 0.01, message: 'El precio debe ser mayor a 0' },
              max: { value: 10000, message: 'El precio no puede superar los $10.000' },
            })}
          />
          {errors.price && <span className="form-error">{errors.price.message}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            rows="3"
            className={errors.description ? 'input-error' : ''}
            {...register('description', {
              required: 'La descripción es obligatoria',
              minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' },
              maxLength: { value: 300, message: 'La descripción no puede superar los 300 caracteres' },
            })}
          />
          {errors.description && (
            <span className="form-error">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            className={errors.category ? 'input-error' : ''}
            {...register('category', { required: 'Elegí una categoría' })}
          >
            <option value="">Seleccionar...</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="form-error">{errors.category.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            className={errors.stock ? 'input-error' : ''}
            {...register('stock', {
              required: 'El stock es obligatorio',
              min: { value: 0, message: 'El stock no puede ser negativo' },
            })}
          />
          {errors.stock && <span className="form-error">{errors.stock.message}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="image">
            Imagen {isEdit && '(dejala vacía para conservar la actual)'}
          </label>
          <input
            id="image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            {...register('image', {
              validate: (files) => {
                const file = files?.[0]
                if (!file) return isEdit || 'La imagen es obligatoria'
                return file.size <= 5 * 1024 * 1024 || 'La imagen no puede superar los 5 MB'
              },
            })}
          />
          {errors.image && <span className="form-error">{errors.image.message}</span>}
        </div>
      </div>

      <div className="form-actions">
        {isEdit && (
          <button type="button" className="btn-secondary-outline" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
        <button type="submit" className="btn-primary btn-lg" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
