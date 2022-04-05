import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { callApi, createProduct } from "../axios-services";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import useUser from "../hooks/useUser";
import "../style/AdminAddProduct.css";

const AdminAddProduct = ({token}) => {

  const { setUser } = useUser();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
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
        body: { name, description, price, inventoryQTY, category, productImg, rating},
      });

        if (product) {
          navigate('/admin-page/products');
        }

    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <>
      <div className="new-product-backdrop">
        <Container>
          <Row className="window1 m-auto">
          {errors && (
                    <div style={{ marginTop: "1em", color: "red" }}>
                      {errors}
                    </div>
                  )}
            <Col lg={5} md={6} sm={12} className="window p-5 m-auto shadow-lg">
              <h3
                className="text-title text-center"
                style={{ overflowY: "hidden" }}
              > Add Product
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
                    <Form.Group
                  className="form-Basic-rating"
                  controlId="formBasicRating"
                >
                  <Form.Control
                    className="rating-box"
                    required
                    placeholder="rating"
                    label="rating"
                    type="rating"
                    variant="outlined"
                    value={rating}
                    onChange={(event) => {
                      setRating(event.target.value);
                    }}
                  />
                </Form.Group>
                </Form.Group>
                <Button
                  style={{ background: "#557272", border: "none" }}
                  className="add-product-button"
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