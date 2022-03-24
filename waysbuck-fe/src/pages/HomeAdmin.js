import React from "react";
import { Heroes, NavbarComponents } from "../Components";
import NavbarComponentsAdmin from "../Components/NavbarComponentsAdmin";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../config/api";
import { useEffect } from "react";
import DeleteData from "../Components/DeleteData";

export default function HomeAdmin() {
  document.title = "WaysBucks | Admin ";
  const [products, setProducts] = useState();

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      console.log(response);
      // Store product data to useState variabel
      setProducts(response.data.data.dataProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Heroes />
      <Container>
        <div className="my-5">
          <h2 className="text-primary-color fw-bold my-4">Let’s Order</h2>
          <Row>
            {products?.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export const ProductCard = ({ item }) => {
  const [products, setProducts] = useState();
  let navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      console.log(response);
      // Store product data to useState variabel
      setProducts(response.data.data.dataProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteById = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Col md={3} className="my-3">
        <Card className="rounded-3 bg-card">
          <Link to={`/product/${item.id}`} className="text-decoration-none">
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title className="text-primary-color fw-bold">
                {item.title}
              </Card.Title>
              <Card.Text className="text-secondary-color">
                Rp. {item.price}
              </Card.Text>
            </Card.Body>
          </Link>
          <Button
            variant="success"
            className="mb-1"
            onClick={() => updateProduct(item.id)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              handleDeleteById(item.id);
            }}
          >
            Delete
          </Button>
        </Card>
      </Col>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};
