import axios from "axios";

const BASE_URL = "https://muttycapsco.herokuapp.com/api";

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
