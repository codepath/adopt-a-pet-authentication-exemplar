import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PetCard from './PetCard'
import '../styles/Pets.css'

const PetsList = ({ filters }) => {
  const [pets, setPets] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams({
      ...(filters.type && { type: filters.type }),
      ...(filters.ageMin && { age_min: filters.ageMin }),
      ...(filters.ageMax && { age_max: filters.ageMax }),
    }).toString()

    fetch(`http://localhost:3000/pets?${queryParams}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Response failed')
        }
        return response.json()
      })
      .then(data => {
        setPets(data)
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error)
        setError('Failed to fetch pets. Please try again later.')
      });
  }, [filters])

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/pets/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the pet.')
      }

      setPets(pets.filter(pet => pet.id !== id))
    })
    .catch(error => {
      console.error('Error:', error)
      setError('Failed to delete pet. Please try again later.')
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update-pet/${id}`)
  }

  if (error) return <div>Error: {error}</div>
  if (!pets.length) return <div>🐶 No pets found! 🐱</div>

  return (
    <div className="pets-container">
      {pets.map(pet => (
        <PetCard 
          key={pet.id}
          pet={pet}
          onUpdate={() => handleUpdate(pet.id)}
          onDelete={() => handleDelete(pet.id)}
        />
      ))}
    </div>
  );
};

export default PetsList;
