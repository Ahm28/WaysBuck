import React from "react";
import { Container } from "react-bootstrap";

export default function Heroes() {
  return (
    <Container>
      <div className="heroes my-5">
        <img src="/assets/jumbotron.png" className="img-fluid" alt="heroes" />
      </div>
    </Container>
  );
}
