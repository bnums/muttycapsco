import axios from "axios";

// const BASE_URL = 'https://muttycapsco.herokuapp.com/api';
const BASE_URL = 'http://localhost:4000/api';


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

export async function login(username, password) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
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
    const { data } = await axios.post(`${BASE_URL}/users/register`, {
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
    const { data: user } = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/products`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchProducts = async (token) => {
  try {
    let response;
    if (token) {
      response = await fetch(`${BASE_URL}/products`, {
        headers: {
          "Content-Type": "applicaton/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(`${BASE_URL}/products`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id, product, token,name,description, price) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: 
      name,
      description,
      price,
    });
    const editProduct = await response.json();
    console.log("you edited a product", editProduct);
    console.log("you created a product activity token", token);
    return editProduct;
  } catch (error) {
    console.error(error);
  }
};

export async function getAllOrders() {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const createProduct = async ({name, description, price, inventoryQTY, productImg, category}) => {
  try {
    const { data } = await axios.post(`${ BASE_URL }api/products`, {name, description, price, inventoryQTY, productImg, category})
      return data;
  } catch (error) {
      console.log(error)
  }
};

export const editProduct = async (id, name, description, price, imageurl, inStock, category) => {
  try {
    const { data } = await axios.patch(`${ BASE_URL }api/products/${id}`, {name, description, price, imageurl, inStock, category})
      return data;
  } catch (error) {
    console.error(error);
  }
};