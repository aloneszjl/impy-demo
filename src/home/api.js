import { api } from '../utils/api';

export const getGithubUser = ({ userName }) =>
  api.get(`/users/${userName}`).then(response => response.data);
