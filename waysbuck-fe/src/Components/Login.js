import React, { useState } from "react";
import { useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function Login(props) {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      console.log(response);

      if (response?.status == 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.status === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
      setForm({
        email: "",
        password: "",
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Email and Password not Match
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
            <h2 className="mb-3 fw-bold text-primary-color">Login</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                variant="none"
                name="email"
                value={email}
                onChange={handleChange}
                className="form-outline-primary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Pasword"
                className="form-outline-primary"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <button className="btn bg-primary-color mb-3">Login</button>
            </div>
            <p>
              Don't have an account ? Klik
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
