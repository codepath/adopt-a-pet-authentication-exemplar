import React from 'react'
import PetCard from './PetCard'
import WithAuth from './WithAuth'

const PetList = ({ pets, onUpdate, onDelete }) => {
  return (
    <div className="pet-list">
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default WithAuth(PetList)
