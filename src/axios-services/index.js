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

export async function getAllUsers() {
  try {
    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
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

// export async function removeProduct(productId, token) {
//   try {
//     const {data} = await axios.delete(`${BASE_URL}/products/${productId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     console.log('product deleted', data)
//     return data
//   } catch (error) {
//     throw error;
//   }
// }


// export const removeProduct = async (id, token) => {
//   const requestToken = {
//       headers: { Authorization: `Bearer ${token}` }
//   };
//   try {
//       const response = await axios.delete(`${ BASE_URL }api/products/${id}`, requestToken)
//       return response;
//   } catch (error) {
//       console.error(error);
//   }
// };


// export const fetchProducts = async (token) => {
//   try {
//     let response;
//     if (token) {
//       response = await fetch(`${BASE_URL}/products`, {
//         headers: {
//           "Content-Type": "applicaton/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } else {
//       response = await fetch(`${BASE_URL}/products`);
//     }
//     const products = await response.json();
//     return products;
//   } catch (error) {
//     console.error(error);
//   }
// };

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

// export async function updateProduct(
//   {
//     newName,
//     newDescription,
//     newPrice,
//     // newImageURL,
//     // newInStock,
//     // newCategory,
//     token,
//   },
// ) {
//   const bearer = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const body = {
//     name: newName,
//     description: newDescription,
//     price: newPrice,
//     // imageURL: newImageURL,
//     // inStock: newInStock,
//     // category: newCategory,
//   };

//   try {
//     const { data } = await axios.patch(
//       `${BASE_URL}/products/${id}`,
//       body,
//       bearer
//     );
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function updateProduct({name, description, price, id, token, productId}) {
//   try {
//     const { data } = await axios.patch(`${BASE_URL}/products/${productId}`, {
//             headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: 
//       name,
//       description,
//       price,
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export const updateProduct = async ({productId, name, description, price}) => {
//   try {
//     const { data } = await axios.patch(`${ BASE_URL }/products/${productId}`, {name, description, price})
//       return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export async function updateProduct(id, token, product) {
//   try {
//     const {data:products} = await axios.patch(`${BASE_URL}/product/${product.id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
      
//     })
//     // const editProduct = await data.json();
//     // console.log("you edited a product", editProduct);
//     // console.log("you created a product activity token", token);
//     return products;
//   } catch (error) {
//     throw error;
//   }
// }

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