import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";

import { API } from "../config/api";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct() {
  document.title = "WaysBucks | Update Product";

  let navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);

      // console.log(response);
      setPreview(response.data.data.dataProducts.image);
      setForm({
        ...form,
        title: response.data.data.dataProducts.title,
        price: response.data.data.dataProducts.price,
        image: response.data.data.dataProducts.image,
      });
      setProduct(response.data.data.dataProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(product);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
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

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("price", form.price);

      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );

      swal({
        title: "Success",
        text: "Your product has been updated.",
        icon: "success",
        button: false,
        timer: 1500,
      });

      console.log(response);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form?.image[0]?.name);

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <div>
      <Container>
        <Row className="my-5 py-5">
          <Col>
            <h3 className="text-primary-color fw-bold my-5"> Product</h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  // value={form.title}
                  value={form.title}
                  name="title"
                  className="form-outline-primary mb-3"
                  onChange={handleChange}
                />
                <Form.Control
                  type="number"
                  value={form.price}
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
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
                  Add Product
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
