import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { API } from "../config/api";

export default function Register(props) {
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      console.log(form);

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      if (response.data.status == "Success Add User") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success Register
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Email has Declared
          </Alert>
        );
        setMessage(alert);
      }

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Please try another email
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="mb-3 fw-bold text-primary-color">Register</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && message}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={name}
                name="name"
                variant="none"
                className="form-outline-primary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                variant="none"
                onChange={handleChange}
                className="form-outline-primary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={password}
                name="password"
                placeholder="Pasword"
                className="form-outline-primary"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <button type="submit" className="btn bg-primary-color mb-3">
                Register
              </button>
            </div>
            <p>
              Already have an account ? Klik
              <a>
                <strong> Here</strong>
              </a>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
