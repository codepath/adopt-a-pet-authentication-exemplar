import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../styles/NavBar.css'; // Import the CSS file for NavBar

const NavBar = ({ onFilter, handleClearFilters }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [type, setType] = React.useState('');
  const [ageMin, setAgeMin] = React.useState('');
  const [ageMax, setAgeMax] = React.useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials
      });

      if (response.ok) {
        setUser(null); // Clear the user in context
        navigate('/login'); // Redirect to the login page
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Network error. Please try again.', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ type, ageMin, ageMax });
  };

  return (
    <nav className="navbar">
      <form onSubmit={handleSubmit} className="filter-form">
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Age"
          value={ageMin}
          onChange={(e) => setAgeMin(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Age"
          value={ageMax}
          onChange={(e) => setAgeMax(e.target.value)}
        />

        <button type="submit">Filter</button>
        <button type="button" onClick={handleClearFilters}>Clear</button>

        <Link to="/add-pet">
          <button type="button">Add Pet</button>
        </Link>
      </form>

      <div className="auth-links">
        {user ? (
          <>
            <span className="welcome-message">Welcome, {user.username}</span>
            <button type="button" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button type="button">Sign Up</button>
            </Link>

            <Link to="/login">
              <button type="button">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
