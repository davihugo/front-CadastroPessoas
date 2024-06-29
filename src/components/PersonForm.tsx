import React, { useState, useEffect } from 'react';
import { Person } from '../types/Person';
import { addPerson, updatePerson } from '../services/api';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid, Box, Typography } from '@mui/material';

interface Props {
  selectedPerson: Person | null;
  onSave: (person: Person) => void;
}

const PersonForm: React.FC<Props> = ({ selectedPerson, onSave }) => {
  const [person, setPerson] = useState<Person>({
    id: 0,
    nome: '',
    cpf: '',
    dataNasc: '',
    sexo: 'M',
    altura: 0,
    peso: 0,
  });

  useEffect(() => {
    if (selectedPerson) {
      setPerson(selectedPerson);
    }
  }, [selectedPerson]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: name === 'altura' || name === 'peso' ? parseFloat(value) : value });
  };

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setPerson({ ...person, sexo: e.target.value as string });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let savedPerson;
      if (person.id === 0) {
        savedPerson = await addPerson(person);
      } else {
        savedPerson = await updatePerson(person);
      }
      onSave(savedPerson);
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastro de Pessoa
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nome"
                variant="outlined"
                required
                fullWidth
                id="nome"
                label="Nome"
                autoFocus
                value={person.nome}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                value={person.cpf}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="dataNasc"
                label="Data de Nascimento"
                name="dataNasc"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={person.dataNasc}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="sexo-label">Sexo</InputLabel>
                <Select
                  labelId="sexo-label"
                  id="sexo"
                  name="sexo"
                  value={person.sexo}
                  onChange={handleSelectChange}
                  label="Sexo"
                >
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Feminino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="altura"
                label="Altura (m)"
                name="altura"
                type="number"
                step="0.01"
                value={person.altura}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="peso"
                label="Peso (kg)"
                name="peso"
                type="number"
                step="0.01"
                value={person.peso}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PersonForm;
