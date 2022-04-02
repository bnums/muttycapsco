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
  
  
  const handleProducts = async () => {
  try {
    const products = await fetchProducts();
    setProducts(products);
    console.log("products", products);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  handleProducts();
}, [token]);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const newProduct = await updateProduct(productId, productToEdit, token);
      setProductToEdit(newProduct);
      navigate("/admin-page");
      console.log("newProduct",newProduct)
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
        <form className="edit-product-form" onSubmit={handleEdit}>
          {products.map((product) => {
            const { id } = product;
            return (
              <>
                {id == productId && (
                  <>
                    <input
                      id="name-input"
                      type="text"
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
                      placeholder="description*"
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
                      placeholder="price*"
                      value={productToEdit.price}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          price: event.target.value,
                        })
                      }
                      required
                    />
                    <button id="submit-button">Submit</button>
                  </>
                )}
              </>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default AdminEditForm;