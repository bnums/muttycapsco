import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi, getAllUsers, getAllProducts, removeProduct, updateProduct, fetchProducts, createProduct } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";

const AdminEditForm = ({
  token,
  products,
  setProducts,
}) => {
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inventoryQTY, setInventoryQTY] = useState('');
  const [category, setCategory] = useState('');
  const [productImg, setProductImg] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  

const getProducts = async () => {
  const data = await callApi({ url: `/products` });
  setProducts(data);
};

useEffect(() => {
  getProducts();
}, []);

  const handleEditProduct = async ({id,name, description, price, inventoryQTY, category, productImg}) => {
      try {
      localStorage.clear();
      const editProduct = await callApi({
        url: `/products/${id}`,
        method: "patch",
        token:token,
        body: { name, description, price, inventoryQTY, category, productImg},
      });
      console.log("editProduct", editProduct);
        } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const productToEdit = products.find((product) => {
      return product.id === productId * 1;
    });
    setProductToEdit(productToEdit);
  }, [products]);
  console.log("productToEdit", productToEdit)
  
  if (!productToEdit) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="edit-a-product">
        <div className="new-product-form-title"> EDIT YOUR PRODUCT </div>
        <form className="edit-product-form" >
          {products.map((product) => {
            const { id } = product;
            return (
              <div key={product.id}>
                {id == productId && (
                  <>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="name"
                      value={productToEdit.name}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          name: event.target.value,
                        })
                      }
                      required
                    />
                    <input
                      id="description-input"
                      type="text"
                      placeholder="description"
                      value={productToEdit.description}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          description: event.target.value,
                        })
                      }
                      required
                    />
                    <input
                      id="price-input"
                      type="text"
                      placeholder="price"
                      value={productToEdit.price}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          price: event.target.value,
                        })
                      }
                      required
                    />
                     <input
                      id="inventoryQTY-input"
                      type="text"
                      placeholder="inventoryQTY"
                      value={productToEdit.inventoryQTY}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          inventoryQTY: event.target.value,
                        })
                      }
                      required
                    />
                        <input
                      id="category-input"
                      type="text"
                      placeholder="category"
                      value={productToEdit.category}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          category: event.target.value,
                        })
                      }
                      required
                    />
                       <input
                      id="productImg-input"
                      type="text"
                      placeholder="productImg"
                      value={productToEdit.productImg}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          productImg: event.target.value,
                        })
                      }
                      required
                    />
                    <button id="submit-button" type="submit" onClick={(e)=>{e.preventDefault(); handleEditProduct(productToEdit)}}>Submit</button>
                  </>
                )}
              </div>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default AdminEditForm;