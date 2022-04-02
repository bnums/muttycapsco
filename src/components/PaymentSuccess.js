import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const PaymentSuccess = ({ show, handleClose }) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for your purchase!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            View Summary
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Back To Products
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentSuccess;
