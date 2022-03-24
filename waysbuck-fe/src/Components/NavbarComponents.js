import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Login from "./Login";
import Register from "./Register";

import { API, setAuthToken } from "../config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const NavbarComponents = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegis, setShowModalRegis] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [cart, setCart] = useState();

  const getCart = async () => {
    try {
      const response = await API.get("/cart");
      console.log(response.data.data);
      setCart(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const navIsntLogin = () => {
    return (
      <>
        <Button
          variant="none"
          className="outline-primary m-2"
          onClick={() => setShowModalLogin(true)}
        >
          Login
        </Button>
        <Login show={showModalLogin} onHide={() => setShowModalLogin(false)} />

        <Button
          className="bg-primary-color m-2"
          variant="none"
          onClick={() => setShowModalRegis(true)}
        >
          Register
        </Button>
        <Register
          show={showModalRegis}
          onHide={() => setShowModalRegis(false)}
        />
      </>
    );
  };

  const navIsLogin = () => {
    return (
      <>
        <Nav.Link>
          <Link to="/checkout" className="text-decoration-none">
            <Button variant="none">
              <img src="/assets/cart.svg" alt="cart" />
              <Badge className="bg-primary-color" bg="none" pill>
                {cart?.length}
              </Badge>
            </Button>
          </Link>
        </Nav.Link>
        <Dropdown>
          <Dropdown.Toggle variant="none">
            <img
              src="/assets/profile.png"
              alt="profile"
              width="50px"
              height="50px"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/profile" className="text-decoration-none">
                <img src="/assets/user.svg" width="20px" />
                <span className="ms-2 text-primary-color">Profile</span>
              </Link>
            </Dropdown.Item>
            <hr />
            <Dropdown.Item href="#" onClick={logout}>
              <img src="/assets/logout.svg" width="20px" />
              <span className="ms-2 text-primary-color">Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const navbarAdmin = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="none">
                <img
                  src="/assets/profile.png"
                  alt="profile"
                  width="50px"
                  height="50px"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    to="/admin/add-product"
                    className="text-decoration-none mb-2"
                  >
                    <img src="/assets/Group.svg" width="20px" />
                    <span className="ms-2 text-primary-color">Add Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/add-toping" className="text-decoration-none">
                    <img src="/assets/topping 1.svg" width="20px" />
                    <span className="ms-2 text-primary-color">Add Topping</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/admin/transactions"
                    className="text-decoration-none"
                  >
                    <img src="/assets/transaction.svg" width="18px" />
                    <span className="ms-2 text-primary-color">
                      Transactions
                    </span>
                  </Link>
                </Dropdown.Item>
                <hr />
                <Dropdown.Item onClick={logout}>
                  <img src="/assets/logout.svg" width="20px" />
                  <span className="ms-2 text-primary-color">Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    );
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          {state.user.status === "admin" ? (
            <Link to="/admin">
              <img
                src="/assets/Logo.svg"
                width="50px"
                height="50px"
                alt="logo"
              />
            </Link>
          ) : (
            <Link to="/">
              <img
                src="/assets/Logo.svg"
                width="50px"
                height="50px"
                alt="logo"
              />
            </Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {localStorage.token
              ? state.user.status === "admin"
                ? navbarAdmin()
                : navIsLogin()
              : navIsntLogin()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponents;
