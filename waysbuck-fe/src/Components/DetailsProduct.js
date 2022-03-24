import React, { useEffect, useState, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { API } from "../config/api";
import Topping from "./Topping";
import { UserContext } from "../context/userContext";

const DetailsProduct = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState();
  const [toppings, setToppings] = useState();
  const [state, dispatch] = useContext(UserContext);

  const [totalPrice, setTotalPrice] = useState();
  document.title = "WaysBucks | " + product?.title;

  const cekPrice = () => {
    let dataTopping = toppings.filter((toping) => toping.checked === true);
    let priceArr = [];

    dataTopping.map((item) => {
      priceArr.push(item.price);
    });

    const price =
      product?.price +
      priceArr.reduce((total, amount) => {
        return total + amount;
      });
    setTotalPrice(price);

    console.log(dataTopping);
  };

  const hndleClick = async (e) => {
    try {
      e.preventDefault();

      let dataTopping = toppings.filter((toping) => toping.checked === true);

      dataTopping = dataTopping.map((item) => {
        return item.id;
      });

      console.log(state.user.id);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        // idUser: state.user.id,?
        idProduct: product.id,
        idTopping: dataTopping,
      };

      const body = JSON.stringify(data);

      await API.post("/cart", body, config);

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

  console.log(totalPrice);

  const getProduct = async () => {
    try {
      const response = await API.get("/product/" + id);
      console.log(response);
      // Store product data to useState variabel
      setProduct(response.data.data.dataProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getToppings = async () => {
    try {
      const response = await API.get("toppings");
      setToppings(response.data.data.dataToppings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    getToppings();
  }, []);

  console.log(product);

  return (
    <>
      <Container>
        <div className="my-5">
          <Row>
            <Col md={4}>
              <img
                src={product?.image}
                alt="coffe"
                // className="my-5"
                width="350px"
              />
            </Col>
            <Col md={8}>
              <h1 className="text-primary-color fw-bold">{product?.title}</h1>
              <p className="fs-5 text-secondary-color">Rp. {product?.price}</p>

              <div className="topping mt-4">
                <h4 className="text-secondary-color mt-4">Topping</h4>
                <Row className="my-4">
                  {toppings?.map((toping) => {
                    return (
                      <Col
                        key={toping.id}
                        md={3}
                        sm={2}
                        className="text-center"
                        style={{ cursor: "pointer" }}
                      >
                        <Topping
                          title={toping.title}
                          image={toping.image}
                          id={toping.id}
                          toping={toppings}
                        />
                      </Col>
                    );
                  })}
                </Row>
                <div className="d-flex justify-content-between">
                  <h4 className="text-secondary-color fw-bold">Total</h4>
                  <p className="text-secondary-color h5 fw-bold">
                    Rp. {totalPrice}
                  </p>
                </div>
              </div>
              <div className="d-grid gap-2 my-3">
                <Button
                  variant="none"
                  className="outline-primary fw-bold"
                  // onClick={() => addtToCart()}
                  onClick={cekPrice}
                >
                  Check the Price
                </Button>
                <Button
                  variant="none"
                  className="bg-primary-color fw-bold"
                  // onClick={() => addtToCart()}
                  onClick={hndleClick}
                >
                  Add Cart
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default DetailsProduct;
