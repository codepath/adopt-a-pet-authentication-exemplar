import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../styles/Forms.css';

const UpdatePetForm = ({ onPetUpdated }) => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({ name: '', type: '', age: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/pets/${petId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setFormData({ name: data.name, type: data.type, age: data.age });
        }
      });
  }, [petId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert age to integer
    const formDataWithIntAge = {
      ...formData,
      age: parseInt(formData.age, 10)
    };

    try {
      const response = await fetch(`http://localhost:3000/pets/${petId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataWithIntAge),
        credentials: 'include', // Include credentials
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Pet updated successfully!' });
        onPetUpdated();
        navigate('/');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update pet.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="update-pet-form-container">
      <form onSubmit={handleSubmit} className="update-pet-form">
        <div className="form-fields">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
        </div>

        <button type="submit">Update Pet</button>
      </form>

      {message && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
};

export default UpdatePetForm;
