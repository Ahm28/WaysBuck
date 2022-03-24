import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function NavbarComponentsAdmin() {
  // const [showModalLogin, setShowModalLogin] = useState(false);
  // const [showModalRegis, setShowModalRegis] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/admin">
            <img src="/assets/Logo.svg" width="50px" height="50px" alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponentsAdmin;
