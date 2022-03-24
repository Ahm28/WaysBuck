import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
  return {
    /* {categories.map((category) => (
            <Col md={3} key={category.id}>
              <Link
                to={`/details/${category.id}`}
                className="text-decoration-none"
              >
                <Card className="rounded-3 bg-card">
                  <Card.Img variant="top" src={`assets/${category.image}`} />
                  <Card.Body>
                    <Card.Title className="text-primary-color fw-bold">
                      {category.name}
                    </Card.Title>
                    <Card.Text className="text-secondary-color">
                      Rp. {category.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))} */
  };
  // <Row>
  // <Col md={3}>
  //   <Link to={"/admin"} className="text-decoration-none">
  //     <Card className="rounded-3 bg-card">
  //       <Card.Img variant="top" src="assets/Ice-coffe-palm.png" />
  //       <Card.Body>
  //         <Card.Title className="text-primary-color fw-bold">
  //           judul 1
  //         </Card.Title>
  //         <Card.Text className="text-secondary-color">
  //           Rp. 20000
  //         </Card.Text>
  //       </Card.Body>
  //     </Card>
  //   </Link>
  // </Col>
  // <Row/>
};

export default Products;
