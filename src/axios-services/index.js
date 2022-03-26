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
>>>>>>> a834d98c913773ebd0ee7da58aaac9953defcf98
