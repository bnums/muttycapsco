import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/AdminProducts.css";
import { callApi } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card, Navbar, Container, Nav} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";


const AdminProducts = ({token}) =>{
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState({})
  const navigate = useNavigate();
  const { userId} = useParams();
  const { user, setUser, setShoppingCart, setUserOrder } = useUser();

  const handleProducts = async () =>{
    try{
      const products = await callApi({ method: 'get', url: `/products`, token:token })
      console.log('this is all the products ', products)
      setProducts(products)
        }catch(error){
          console.log(error)
        }
      }
      
      useEffect(() => {
        handleProducts()
        },[setProducts, token]);
  
  
        const handleDeleteProduct= async (event, id) => {
          event.preventDefault()
          try {
            
              const deletedProduct = await callApi({ method: 'delete', url: `/products/${id}`,token:token})
              console.log(deletedProduct)
              handleProducts()
          } catch (error) {
            console.error(error);
          }
        };

        return (
                <div className="products-backdrop">
            <h3 className="products-title">Products</h3>
                  <Button  className="add-product-button"
                                  variant="dark"
                                  onClick={() => {
                                    navigate(`/admin-page/products/add`);
                                  }}>Add Product</Button>
                    <div className="list-of-products">
                      {products.map(product => {
                        const { id, description, productImg, name, price, isAdmin} = product;
                      return (
                        <div className="first-product" key={product.id}>
                      <div className="product_card">
                        <img
                      className="product_card-img"
                      src={productImg || cardplaceholder}
                      alt="img of dog with yellow beanie"
                    />
                        <h3 className="product_card-name">{name}</h3>
                        <p className="product_card-price">{price}</p>
                        <Button  className="edit-product-button"
                                  variant="dark"
                                  onClick={() => {
                                    navigate(`/products/${id}/edit`);
                                  }}>Edit</Button>
                        <Button  className="delete-product-button"
                                  variant="dark"
                                  onClick={(event) => {
                                    handleDeleteProduct(event, id, isAdmin);
                                  }}>
                                    Delete
                        </Button>        
                      </div>
                      </div>
                      )
                      })}
                  </div>
                  </div>
            )
            }
export default AdminProducts