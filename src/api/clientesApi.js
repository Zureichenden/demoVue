import axios from 'axios';

const API_URL2 = 'https://localhost:7241/api/clientes';
const API_URL = 'http://localhost:5261/api/clientes';

export const getClientes = () => {
  return axios.get(API_URL);
};

export const createCliente = (cliente) => {
  return axios.post(API_URL, cliente);
};

export const updateCliente = (id, cliente) => {
  return axios.put(`${API_URL}/${id}`, cliente);
};

export const deleteCliente = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const exportClientesExcel = () =>
  axios.get(`${API_URL}/export`, {
    responseType: 'blob'
  })

