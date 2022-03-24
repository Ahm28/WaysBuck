import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API } from "../config/api";

export default function Cart({ image, titlePR, titleTP, total, id }) {
  let navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      swal({
        title: "success",
        text: "Your new Product has been added.",
        icon: "danger",
        button: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col md={2}>
        <img width="70px" src={image} />
      </Col>
      <Col md={8}>
        <h5 className="text-primary-color">{titlePR}</h5>
        <p className="text-secondary-color fs-6">Topings : {titleTP}</p>
      </Col>
      <Col md={2} className="d-flex flex-column ">
        <p className="text-secondary-color ms-auto">Rp. {total}</p>
        <p
          className="text-secondary-color fs-6 ms-auto"
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(id)}
        >
          <BsTrashFill />
        </p>
      </Col>
    </>
  );
}
