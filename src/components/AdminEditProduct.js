import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/AdminEditProduct.css";
import { callApi} from "../axios-services";
import useUser from "../hooks/useUser";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const AdminEditProduct = ({token

}) => {
  const {user}=useUser()
  const [products, setProducts] = useState([])
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [errors, setErrors] = useState([]);
  

const handleProducts = async () =>{
  try{
    const products = await callApi({ method: 'get', url: `/products`, token:token })
    console.log('this is all the products ', products)
    setProducts(products)
      }catch(error){
        setErrors(error.message);
        console.log(error)
      }
    }
    
    useEffect(() => {
      handleProducts()
      },[setProducts, token]);

  const handleEditProduct = async ({id,name, description, price, inventoryQTY, category, productImg, rating}) => {
      try {
      localStorage.clear();
      const editProduct = await callApi({
        url: `/products/${id}`,
        method: "patch",
        token:token,
        body: { name, description, price, inventoryQTY, category, productImg, rating},
      });
      console.log("editProduct", editProduct);
        } catch (error) {
          setErrors(error.message);
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
    <div className="edit-a-product-backdrop">
      <div className="edit-a-product">
          {products.map((product) => {
            const { id } = product;
            return (
              <div key={product.id}>
                {id == productId && (
                  <>
                  <Container>
        <Row className="window1 m-auto">
        {errors && (<div style={{ marginTop: "1em", color: "red" }}>
                      {errors}
                    </div>
                  )}
            <Col lg={5} md={6} sm={12} 
            className="window p-5 m-auto shadow-lg">
              <h3
                className="text-title text-center"
                style={{ overflowY: "hidden" }}
              >Edit Product
              </h3>
        <Form className="edit-product-form" >
                   <Form.Group
                  className="form-Basic-name"
                  controlId="formBasicName"
                >
                    <Form.Control
                      className="name-input"
                      type="text"
                      label="name"
                      variant="outlined"
                      required
                      placeholder="name"
                      value={productToEdit.name}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          name: event.target.value,
                        })
                      }
                  />
                  </Form.Group>
                <Form.Group
                  className="form-Basic-description"
                  controlId="formBasicDescription"
                >
                  <Form.Control
                      className="description-input"
                      type="text"
                      required
                      label="description"
                      variant="outlined"
                      placeholder="description"
                      value={productToEdit.description}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          description: event.target.value,
                        })
                      }
                    />
                     </Form.Group>
                <Form.Group
                  className="form-Basic-price"
                  controlId="formBasicPrice"
                >
                  <Form.Control
                      className="price-input"
                      type="text"
                      required
                      label="price"
                      variant="outlined"
                      placeholder="price"
                      value={productToEdit.price}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          price: event.target.value,
                        })
                      }
                    />
                </Form.Group>
                <Form.Group
                  className="form-Basic-inventoryQTY"
                  controlId="formBasicInventoryQTY"
                >
                  <Form.Control
                      className="inventoryQTY-input"
                      type="text"
                      required
                      label="inventoryQTY"
                      variant="outlined"
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
                      </Form.Group>
                <Form.Group
                  className="form-Basic-category"
                  controlId="formBasicCategory"
                >
                  <Form.Control
                      className="category-input"
                      type="text"
                      required
                      label="category"
                      variant="outlined"
                      placeholder="category"
                      value={productToEdit.category}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          category: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                <Form.Group
                  className="form-Basic-productImg"
                  controlId="formBasicProductImg"
                >
                  <Form.Control
                      className="productImg-input"
                      type="text"
                      required
                      label="productImg"
                      variant="outlined"
                      placeholder="productImg"
                      value={productToEdit.productImg}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          productImg: event.target.value,
                        })
                      }
                    />
                    </Form.Group>
                  <Form.Group
                  className="form-Basic-rating"
                  controlId="formBasicRating"
                >
                  <Form.Control
                      className="rating-input"
                      type="text"
                      required
                      label="productImg"
                      variant="outlined"
                      placeholder="rating"
                      value={productToEdit.rating}
                      onChange={(event) =>
                        setProductToEdit({
                          ...productToEdit,
                          rating: event.target.value,
                        })
                      }
                    />
                     </Form.Group>
                    <Button id="submit-button" type="submit" 
                    style={{ background: "#557272", border: "none" }}
                    className="edit-product-button"
                      onClick={(e)=>{e.preventDefault(); navigate(`/admin-page/products`);
                     handleEditProduct(productToEdit)}}>Edit</Button>
        </Form>
        </Col>
          </Row>
        </Container>
        </>
        )}
      </div>
      )})}
    </div>
    </div>
    </>
  );
}; 
export default AdminEditProduct;