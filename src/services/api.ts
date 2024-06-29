import axios from 'axios';
import { Person } from '../types/Person';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPeople = async (): Promise<Person[]> => {
  const response = await api.get<Person[]>('/people');
  return response.data;
};

export const addPerson = async (person: Person): Promise<Person> => {
  const response = await api.post<Person>('/people', person);
  return response.data;
};

export const updatePerson = async (person: Person): Promise<Person> => {
  const response = await api.put<Person>(`/people/${person.id}`, person);
  return response.data;
};

export const deletePerson = async (id: number): Promise<void> => {
  await api.delete(`/people/${id}`);
};

export const calculateIdealWeight = async (id: number): Promise<number> => {
  const response = await api.get<number>(`/people/${id}/ideal-weight`);
  return response.data;
};
