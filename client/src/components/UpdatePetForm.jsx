import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import '../styles/Forms.css'

const UpdatePetForm = () => {
  const { petId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    age: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (petId) {
      fetch(`http://localhost:3000/pets/${petId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pet not found.')
          }
          return response.json()
        })
        .then(data => {
          setFormData({
            name: data.name,
            type: data.type,
            age: data.age.toString(),
          });
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error:', error)
          setError('Failed to fetch pet details.')
          setIsLoading(false)
        })
    } else {
      setError('No pet ID provided.')
      setIsLoading(false)
    }
  }, [petId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedFormData = {
      ...formData,
      age: parseInt(formData.age, 10)
    }

    fetch(`http://localhost:3000/pets/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update the pet.')
      }
      return response.json()
    })
    .then(data => {
      console.log('Success:', data)
      navigate('/')
    })
    .catch(error => {
      console.error('Error:', error)
      setError('Failed to update pet. Please try again later.')
    })
  }

  if (isLoading) return <div>🐱 No pet found! 🐶</div>
  if (error) return <div>Error: {error}</div>

  return (
    <form className="pet-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </label>

      <div className="form-buttons">
        <button type="submit">Update</button>

        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>

    </form>
  )
}

export default UpdatePetForm
