import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Box, Typography } from '@mui/material';
import { Person } from '../types/Person';
import { deletePerson, calculateIdealWeight } from '../services/api';

interface Props {
  persons: Person[];
  onEdit: (person: Person) => void;
  onDelete: () => void;
}

const PersonList: React.FC<Props> = ({ persons, onEdit, onDelete }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleDelete = async (id: number) => {
    try {
      await deletePerson(id);
      onDelete();
    } catch (error) {
      console.error('Erro ao deletar pessoa:', error);
    }
  };

  const handleCalculateIdealWeight = async (id: number) => {
    try {
      const idealWeight = await calculateIdealWeight(id);
      alert(`Peso ideal: ${idealWeight} kg`);
    } catch (error) {
      console.error('Erro ao calcular peso ideal:', error);
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h6" component="h2" gutterBottom>
        Lista de Pessoas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Altura</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.nome}</TableCell>
                <TableCell>{person.cpf}</TableCell>
                <TableCell>{person.dataNasc}</TableCell>
                <TableCell>{person.sexo}</TableCell>
                <TableCell>{person.altura}m</TableCell>
                <TableCell>{person.peso}kg</TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(person)} variant="contained" color="primary" size="small">Editar</Button>
                  <Button onClick={() => handleDelete(person.id)} variant="contained" color="secondary" size="small">Excluir</Button>
                  <Button onClick={() => handleCalculateIdealWeight(person.id)} variant="contained" color="info" size="small">Peso Ideal</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" marginY={2}>
        <Pagination count={Math.ceil(persons.length / rowsPerPage)} page={page} onChange={handleChangePage} />
      </Box>
    </Container>
  );
};

export default PersonList;
