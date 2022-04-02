import axios from "axios";
<<<<<<< HEAD
const BASE_URL =
  "http://localhost:4000/api"; /*'https://muttycapsco.herokuapp.com/api'*/
=======
const BASE_URL = "http://localhost:4000/api"; //'https://muttycapsco.herokuapp.com/api';
>>>>>>> c8883f364f6aac256e9521da8870551750b0cf51

export const api = axios.create({
  baseURL: `${BASE_URL}`,
});

export const callApi = async ({ url, method, token, body }) => {
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
    const errToThrow = error?.response?.data; // handle axios 400- and 500-level errors
    throw errToThrow;
  }
};
