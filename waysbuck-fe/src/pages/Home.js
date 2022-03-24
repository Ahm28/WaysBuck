import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heroes, NavbarComponents } from "../Components";
import { API } from "../config/api";

export default function Home() {
  document.title = "WaysBucks";

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
  return (
    <Col md={3} className="my-3">
      <Link to={`/product/${item.id}`} className="text-decoration-none">
        <Card className="rounded-3 bg-card">
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title className="text-primary-color fw-bold">
              {item.title}
            </Card.Title>
            <Card.Text className="text-secondary-color">
              Rp. {item.price}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};
