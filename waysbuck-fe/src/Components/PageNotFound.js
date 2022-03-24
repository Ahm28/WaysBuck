import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <Container>
        <div className="d-flex justify-content-center my-5 py-5">
          <div className="text-center">
            <img
              src="/assets/undraw_not_found_-60-pq.svg"
              width="80%"
              height="50%"
            />
            <h2 className="fw-bold text-primary-color my-4">Page Not Found</h2>
            <Link to="/" className="fs-5 text-primary-color">
              &#8592; Back To Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
