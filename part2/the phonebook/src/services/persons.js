import axios from 'axios';

const BASE_URL = '/api';

const getAll = () => {
  const request = axios.get(`${BASE_URL}/persons`);
  return request.then((response) => (response.data));
};

const create = (person) => {
  const request = axios.post(`${BASE_URL}/persons`, person);
  return request.then((response) => (response.data));
};

const remove = (person) => {
  const request = axios.delete(`${BASE_URL}/person/${person}`);
  return request.then((response) => (response.data));
};

const update = (person) => {
  const request = axios.put(`${BASE_URL}/persons/${person.id}`, person);
  return request.then((response) => (response.data));
}

export default {getAll, create, remove, update};
