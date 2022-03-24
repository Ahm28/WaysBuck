import React, { useState } from "react";
import {
  InputGroup,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import swal from "sweetalert";
import { API } from "../config/api";
import NavbarComponentsAdmin from "./NavbarComponentsAdmin";

export default function AddTopping() {
  document.title = "WaysBuck | Add Topping";

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);

      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      console.log(form);

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);

      const response = await API.post("/topping", formData, config);
      console.log(response);

      swal({
        title: "Success",
        text: "Your new Topping has been added.",
        icon: "success",
        button: false,
        timer: 1500,
      });

      setForm({
        title: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Row className="my-5 py-5">
          <Col>
            <h3 className="text-primary-color fw-bold my-5"> Topping</h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Name Product"
                  onChange={handleChange}
                  className="form-outline-primary mb-3"
                />
                <Form.Control
                  type="number"
                  placeholder="Price"
                  onChange={handleChange}
                  name="price"
                  className="form-outline-primary mb-3"
                />
                <Form.Control
                  type="file"
                  name="image"
                  id="upload"
                  className="form-outline-primary"
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="none"
                  className="bg-primary-color"
                >
                  Add Topping
                </Button>
              </div>
            </Form>
          </Col>
          <Col>
            {preview && (
              <img src={preview} className="mx-5" width="80%" height="80%" />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
