import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Cart from "../Components/Cart";
import { API } from "../config/api";

export default function Checkout() {
  document.title = "WaysBucks | Cart";

  let navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const getCart = async () => {
    try {
      const response = await API.get("/cart");
      setCart(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPrice = () => {
    const tPrice = cart.map((item) => {
      return item.products.price + item.toppings.price;
    });

    setTotalPrice(
      tPrice.reduce((total, amount) => {
        return total + amount;
      })
    );
  };

  const addToTransactions = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let idCart = cart.map((item) => {
        return item.id;
      });

      const data = {
        idCart,
      };

      const body = JSON.stringify(data);

      await API.post("transaction", body, config);

      swal({
        title: "Success",
        text: "Your new Product has been added.",
        icon: "success",
        button: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
    // return () => getCart();
  }, []);

  return (
    <div>
      <Container>
        <div className="my-5">
          <h3 className="text-primary-color fw-bold mb-4">My Cart</h3>

          <Row>
            <Col md={7}>
              <h5 className="text-secondary-color">Review Your Order</h5>
              <hr />
              <>
                {cart.map((item) => {
                  return (
                    <Row key={item.id}>
                      <Cart
                        image={item.products.image}
                        titlePR={item.products.title}
                        titleTP={item.toppings.title}
                        total={item.products.price + item.toppings.price}
                        id={item.id}
                      />
                    </Row>
                  );
                })}
                <hr />

                <Row>
                  <Col>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <p className="text-secondary-color">SubTotal</p>
                      <p className="text-secondary-color">Rp. {totalPrice}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-secondary-color">Qty</p>
                      <p className="text-secondary-color">{cart.length}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h4 className="text-primary-color">Total</h4>
                      <p className="text-primary-color">Rp. {totalPrice}</p>
                    </div>
                    <button
                      className="bg-primary-color rounded px-2"
                      onClick={getPrice}
                    >
                      Cek Total Price
                    </button>
                  </Col>
                  <Col>
                    <Form.Control type="file" />
                  </Col>
                </Row>
              </>
            </Col>
            <Col md={5}>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  htmlFor="name"
                >
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="form-outline-primary"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  htmlFor="name"
                >
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-outline-primary"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  htmlFor="name"
                >
                  <Form.Control
                    name="phone"
                    type="number"
                    placeholder="Phone Number"
                    className="form-outline-primary"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  htmlFor="name"
                >
                  <Form.Control
                    name="postCode"
                    type="number"
                    placeholder="Post Code"
                    className="form-outline-primary"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={7}
                    placeholder="Address"
                    className="form-outline-primary"
                  />
                </Form.Group>
              </Form>
              <div className="d-grid gap-2">
                <Button
                  variant="none"
                  className="bg-primary-color"
                  size="lg"
                  onClick={addToTransactions}
                >
                  Pay
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
