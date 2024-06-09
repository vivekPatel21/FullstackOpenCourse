import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = (newPerson) => {
  // Ensure the ID is a string
  const newPersonWithStringId = { ...newPerson, id: String(newPerson.id) };
  return axios.post(baseUrl, newPersonWithStringId).then(response => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
};

export default { getAll, create, remove, update };
