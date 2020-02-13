import { environment } from 'src/environments/environment';

const serverUrl = `${environment.serverUrl}user/`;
const endpoints = {
  login: 'login',
  signup: 'signup',
  findUser: 'findUser',
};

const loginURL = `${serverUrl}${endpoints.login}`;
const signupURL = `${serverUrl}${endpoints.signup}`;
const findUserURL = `${serverUrl}${endpoints.findUser}`;

export { loginURL, signupURL, findUserURL };
