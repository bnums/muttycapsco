import axios from "axios";
const BASE_URL = 'https://muttycapsco.herokuapp.com/api';

export const api = axios.create({
  baseURL: `${BASE_URL}`,
});

export const callApi = async ({
  url,
  method,
  token,
  body,
  displayErrorNotification = false,
}) => {
  try {
    const options = {
      method: method ? method.toLowerCase() : "get",
      url: `${BASE_URL}${url}`,
      data: body,
    };
    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }
    const { data } = await api(options);
    if (data.error) throw data.error;

    return data;
  } catch (error) {
    const errToThrow = error?.response?.data?.error; // handle axios 400- and 500-level errors
    console.error(errToThrow);
    if (displayErrorNotification) {
      alert(errToThrow);
    }
  }
};
export async function login(username, password) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function register({
  username,
  password,
  email,
}) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/register`, {
      username,
      password,
      email,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(token) {
  try {
    const { data: user } = await axios.get(`${BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
