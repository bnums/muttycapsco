// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

import axios from "axios";
const BASE_URL = "http://localhost:4000/api";

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
