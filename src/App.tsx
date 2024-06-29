import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Person } from './types/Person';
import { getPeople } from './services/api';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const fetchPersons = async () => {
    const data = await getPeople();
    setPersons(data);
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleEdit = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleDelete = () => {
    fetchPersons();
  };

  const handleSave = (savedPerson: Person) => {
    setPersons((prevPersons) => {
      const updatedPersons = prevPersons.filter((p) => p.id !== savedPerson.id);
      return savedPerson.id === 0 ? [...prevPersons, savedPerson] : [...updatedPersons, savedPerson];
    });
    setSelectedPerson(null);
    fetchPersons();
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        
      </Typography>
      <PersonForm selectedPerson={selectedPerson} onSave={handleSave} />
      <PersonList persons={persons} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
};

export default App;
