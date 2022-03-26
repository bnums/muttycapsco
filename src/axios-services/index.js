import axios from "axios";
const API_URL = 'https://muttycapsco.herokuapp.com';

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
// export const api = axios.create({
//   baseURL: `${API_URL}/api`,
// })
export const callApi = async ({url, method, token, body}) => {
  console.log({url: `${API_URL}/api${url}`, method, token, body})
  try {
    const options = {
      method: method ? method.toLowerCase() : 'get',
      url: `${API_URL}/api${url}`,
      data: body,
    };
    if(token) {
      options.headers = {'Authorization': `Bearer ${token}`};
    }
    const {data} = await axios(options);
    if(data.error) throw data.error;
    return data;
  } catch ({name, message}) {
    // const errToThrow = error?.response?.data?.error; // handle axios 400- and 500-level errors
    console.error({name, message});
  }
}
// export const callApi = async ({ url, method, token, body }) => {
//   console.log({url: `${API_URL}/api${url}`, method, token, body})
//   try {
//     const options = {
//       method: method ? method.toUpperCase() : "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     };
//     if (token) {
//       options.headers["Authorization"] = `Bearer ${token}`;
//     }
//     const response = await fetch(API_URL + url, options);
//     console.log("this is the response", response);
//     const data = await response.json();
//     console.log(data.message);
//     console.log("this is the data", data);

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export async function login(username, password) {
  try {
    const { data } = await axios.post(`${API_URL}/api/users/login`, {
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
    const { data } = await axios.post(`${API_URL}/api/users/register`, {
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
    const { data: user } = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
