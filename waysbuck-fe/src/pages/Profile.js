import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponents } from "../Components";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [state, dispatch] = useContext(UserContext);

  const getProfiles = async () => {
    try {
      const response = await API.get("/profile");

      // console.log(response);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state.user.name);

  useEffect(() => {
    getProfiles();
  });

  return (
    <div>
      <Container>
        <Row className="my-5">
          <Col>
            <h3 className="text-primary-color fw-bold">My Profile</h3>
            <div className="my-3 d-flex">
              <img src="assets/profile-mask.png" />
              <div className="mx-4">
                <h5>Full Name</h5>
                <p className="fs-6">{state.user.name}</p>
                <h5 className="mt-5">Email</h5>
                <p className="fs-6">{state.user.email}</p>
              </div>
            </div>
          </Col>
          <Col>
            <h3 className="text-secondary-color fw-bold mb-3">
              My Transaction
            </h3>
            <img src="/assets/transaction.png" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
