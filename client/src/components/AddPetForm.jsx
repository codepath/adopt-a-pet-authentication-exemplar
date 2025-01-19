import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Forms.css'

const AddPetForm = ({ onPetAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    age: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to add pet.')
    })
    .then(data => {
      console.log('Success:', data)
      onPetAdded()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

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
        <button type="submit">Submit</button>

        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>

    </form>
  )
}

export default AddPetForm
