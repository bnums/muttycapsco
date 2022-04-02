import React from "react";
import "../style/Product.css";
import { ProductReviews, SimilarProducts } from ".";
import { ProductImage, ProductInfo } from ".";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { callApi } from "../axios-services";
import { Modal, Container, Col, Row } from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";

const Product = ({ token }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);

  const getProductByProductId = async () => {
    const data = await callApi({ url: `/products/${productId}` });
    setProduct(data);
  };

  const getReviewsByProductId = async () => {
    const data = await callApi({ url: `/reviews/${productId}` });
    setReviews(data);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getProductByProductId();
    getReviewsByProductId();
  }, [productId]);

  return (
    <div className="product-container container">
      <div className="product-detail-container row">
        <ProductImage {...product}></ProductImage>
        <ProductInfo {...product} token={token} setShow={setShow}></ProductInfo>
      </div>
      <div className="similar-products-wrapper">
        <SimilarProducts
          category={product?.category}
          currentProductId={product?.id}
        ></SimilarProducts>
      </div>
      <div className="reviews-wrapper">
        <ProductReviews reviews={reviews}></ProductReviews>
      </div>
      <Modal className="product-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Item Successfully Added!</h5>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <img
                  src={product.productImg || cardplaceholder}
                  style={{ width: "128px", height: "128px" }}
                ></img>
              </Col>
              <Col>
                <p style={{ fontWeight: 700 }}>{product.name}</p>
                <p>{product.price}</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              navigate("/shopping-cart");
            }}
          >
            View Bag
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Product;
