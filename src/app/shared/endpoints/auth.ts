// const endpoint = 'https://meals-node-api.herokuapp.com/';
const serverUrl = 'http://localhost:5000/user/';
const endpoints = {
  login: 'login',
  signup: 'signup',
  findUser: 'findUser',
};

const loginURL = `${serverUrl}${endpoints.login}`;
const signupURL = `${serverUrl}${endpoints.signup}`;
const findUserURL = `${serverUrl}${endpoints.findUser}`;

export { loginURL, signupURL, findUserURL };
