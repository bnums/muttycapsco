import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { callApi, createProduct } from "../axios-services";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import useUser from "../hooks/useUser";
// import { Form } from "react-bootstrap";
// import { Container, Row, Col, Button } from "react-bootstrap";
import "../style/index.css";

const AdminAddProduct = ({token}) => {

  const { setUser } = useUser();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryQTY, setInventoryQTY] = useState("");
  const [category, setCategory] = useState("");
  const [productImg, setProductImg] = useState("");

  const handleSubmit = async (event, productId) => {
    try {
      event.preventDefault();
      localStorage.clear();
      const product = await callApi({
        url: `/products`,
        method: "POST",
        body: { name, description, price, inventoryQTY, category, productImg},
      });

    //   const token = product && product.token;
    //   if (token) {
    //     const product = await callApi({
    //       url: `/product`,
    //       method: "GET",
    //       token,
    //     });
//         const products = product;
//         if (products) {
//           setName("");
//           setDescription("");
//           setPrice("");
//           setInventoryQTY("");
//           setCategory("");
//           setProductImg("");
//           navigate('/admin-page');
//           localStorage.setItem("user", JSON.stringify(products));
//         }

//     }
    } catch (error) {
      setErrors(error.message);
    }
  };

// const handleProductSubmit = async (event ) => {
//     try {
//       event.preventDefault();
//       const newProducts = await createProduct(name, description, price, inventoryQTY, category, productImg, token);
//       console.log("newProduct", newProducts);
//       setProducts([...products, newProducts]);
//     } catch (error) {
//       setErrors(error)
//     }
//   };

  return (
    <>
      <div className="new-product-backdrop">
        <Container>
          <Row className="window1 m-auto">
            <Col lg={5} md={6} sm={12} className="window p-5 m-auto shadow-lg">
              <h3
                className="text-title text-center"
                style={{ overflowY: "hidden" }}
              >
              </h3>
              <Form className="new-product-form" onSubmit={handleSubmit}>
                <Form.Group
                  className="form-Basic-name"
                  controlId="formBasicName"
                >
                  <Form.Control
                    className="name-box"
                    required
                    placeholder="name"
                    label="name"
                    type="name"
                    variant="outlined"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="form-Basic-description"
                  controlId="formBasicDescription"
                >
                  <Form.Control
                    className="description-box"
                    required
                    placeholder="description"
                    label="description"
                    type="description"
                    variant="outlined"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="form-Basic-price"
                  controlId="formBasicPrice"
                >
                    <Form.Control
                      className="price-box"
                      required
                      placeholder="price"
                      label="price"
                      type="price"
                      variant="outlined"
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    />
                </Form.Group>
                 <Form.Group
                  className="form-Basic-inventoryQTY"
                  controlId="formBasicInventoryQTY"
                >
                    <Form.Control
                      className="inventoryQTY-box"
                      required
                      placeholder="inventoryQTY"
                      label="inventoryQTY"
                      type="inventoryQTY"
                      variant="outlined"
                      value={inventoryQTY}
                      onChange={(event) => {
                        setInventoryQTY(event.target.value);
                      }}
                    />
                    
                      {errors && (
                    <div style={{ marginTop: "1em", color: "red" }}>
                      {errors}
                    </div>
                  )}
                </Form.Group>
                <Form.Group
                  className="form-Basic-category"
                  controlId="formBasicCategory"
                >
                    <Form.Control
                      className="category-box"
                      required
                      placeholder="category"
                      label="category"
                      type="category"
                      variant="outlined"
                      value={category}
                      onChange={(event) => {
                        setCategory(event.target.value);
                      }}
                    />
                </Form.Group>
                <Form.Group
                  className="form-Basic-productImg"
                  controlId="formBasicProductImg"
                >
                    <Form.Control
                      className="productImg-box"
                      required
                      placeholder="productImg"
                      label="productImg"
                      type="productImg"
                      variant="outlined"
                      value={productImg}
                      onChange={(event) => {
                        setProductImg(event.target.value);
                      }}
                    />
                </Form.Group>
                <Button
                  style={{ background: "#557272", border: "none" }}
                  className="login-register-button"
                  type="submit"
                >
                  Create
                </Button>
              </Form>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  );
};

export default AdminAddProduct;