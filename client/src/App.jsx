import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import PetsList from './components/PetsList';
import AddPetForm from './components/AddPetForm';
import UpdatePetForm from './components/UpdatePetForm';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { useUser } from './contexts/UserContext';
import WithAuth from './components/WithAuth';
import './App.css';

const App = () => {
  const [filters, setFilters] = useState({});
  const { user, setUser } = useUser();

  const ProtectedAddPetForm = WithAuth(AddPetForm);
  const ProtectedUpdatePetForm = WithAuth(UpdatePetForm);

  useEffect(() => {
    fetch("http://localhost:3000/me", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUser(data); // Set the user in context
        }
      });
  }, [setUser]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <main>
        <header>
          <h1>🐶 Adopt-a-Pet 🐱</h1>
        </header>

        <NavBar onFilter={handleFilter} />
        <Routes>
          <Route path="/" element={<PetsList filters={filters} />} />
          {/* <Route path="/add-pet" element={<WithAuth><AddPetForm onPetAdded={() => window.location.href = '/'} /></WithAuth>} />
          <Route path="/update-pet/:petId" element={<WithAuth><UpdatePetForm onPetUpdated={() => window.location.href = '/'} /></WithAuth>} /> */}

          <Route path="/add-pet" element={<ProtectedAddPetForm onPetAdded={() => window.location.href = '/'} />} />
          <Route path="/update-pet/:petId" element={<ProtectedUpdatePetForm onPetUpdated={() => window.location.href = '/'} />} />

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
