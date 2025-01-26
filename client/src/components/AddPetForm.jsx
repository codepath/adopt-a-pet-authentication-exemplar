import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WithAuth from './WithAuth'
import '../styles/Forms.css'

const AddPetForm = ({ onPetAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    age: '',
  })
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert age to integer
    const formDataWithIntAge = {
        ...formData,
        age: parseInt(formData.age, 10)
    };

    try {
        const response = await fetch("http://localhost:3000/pets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataWithIntAge),
            credentials: "include", // Include credentials
        });

        const data = await response.json();

        if (response.ok) {
            setMessage({ type: "success", text: "Pet added successfully!" });
            navigate("/"); // Redirect to the homepage
        } else {
            setMessage({ type: "error", text: data.error || "Failed to add pet." });
        }
    } catch (error) {
        setMessage({ type: "error", text: "Network error. Please try again." });
    }
};

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

export default WithAuth(AddPetForm)
