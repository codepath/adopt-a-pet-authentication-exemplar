import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pets.css';
import { useUser } from '../contexts/UserContext';

const PetCard = ({ pet, onUpdate, onDelete }) => {
  const { user } = useUser(); // Get logged-in user
  const navigate = useNavigate();

  const isOwner = user && pet.userId === user.id; // Check if user owns this pet

  const handleDelete = async (petId) => {
    try {
        const response = await fetch(`http://localhost:3000/pets/${petId}`, {
            method: "DELETE",
            credentials: "include", // Include credentials
        });

        if (response.ok) {
            console.log("Pet deleted successfully");
            navigate('/'); // Navigate to the home page
            window.location.reload(); // Reload the homepage
        } else {
            const data = await response.json();
            console.error("Failed to delete pet:", data.error);
        }
    } catch (error) {
        console.error("Network error. Please try again.", error);
    }
  };

  return (
    <div className="pet-card">
      <h2>{pet.name}</h2>
      <p><strong>Type:</strong> {pet.type}  |  <strong>Age:</strong> {pet.age}</p>

      {isOwner && (  // Show buttons only if the user owns this pet
        <div className="actions">
          <button onClick={() => onUpdate(pet.id)}>Update</button>
          <button onClick={() => handleDelete(pet.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PetCard;
