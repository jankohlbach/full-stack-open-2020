import axios from 'axios';

const BASE_URL = '/api/persons';

const getAll = () => {
  const request = axios.get(`${BASE_URL}`);
  return request.then((response) => (response.data));
};

const create = (person) => {
  const request = axios.post(`${BASE_URL}`, person);
  return request.then((response) => (response.data));
};

const remove = (person) => {
  const request = axios.delete(`${BASE_URL}/${person}`);
  return request.then((response) => (response.data));
};

const update = (person) => {
  const request = axios.put(`${BASE_URL}/${person.id}`, person);
  return request.then((response) => (response.data));
}

export default {getAll, create, remove, update};
