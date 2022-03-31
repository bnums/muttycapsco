import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi, getAllUsers, getAllProducts, removeProduct, updateProduct, fetchProducts } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";

const AdminEditForm = ({
    token,
    users,
    setUsers,
    // products,
    // setProducts,
    isAdmin,
    productId,
    UserId
}) => {
  const [productToEdit, setProductToEdit] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();
  // const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


// const handleProducts = async () =>{
//     try{
//       const products = await callApi({ method: 'get', url: `/products`, token:token })
//       console.log('this is all the products ', products)
//       setProducts(products)
//         }catch(error){
//           console.log(error)
//         }
//       }

//   useEffect(() => {
//     handleProducts();
//   }, [token]);

  // const handleEditProductSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const newProduct = await updateProduct(productId, productToEdit, token);
  //     setProductToEdit(newProduct);
  //     navigate("/admin-page");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleEditProductSubmit= async (event, productId) => {
    event.preventDefault()
    try {
      
        const editedProduct = await callApi({ method: 'patch', url: `/products/${productId}`,token:token})
        console.log(editedProduct)
        setProduct(editedProduct)
      
    } catch (error) {
      console.error(error);
    }
    // navigate("/admin-page");
  };



  // useEffect(() => {
  //   const productToEdit = products.find((id) => {
  //     return id === productId * 1;
  //   });
  //   setProductToEdit(productToEdit);
  // }, [products]);
  
  // if (!productToEdit) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="edit-a-product">
        <div className="new-product-form-title"> Edit Your Product </div>
        <form className="edit-product-form" onSubmit={handleEditProductSubmit}>
          {products.map((product) => {
            const { id } = product;
            return (
              <>
                {id == productId && (
                  <>
                    <input
                      className="name-input"
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
                      className="description-input"
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