import React, { useState } from "react";
import { Badge, Col } from "react-bootstrap";

const Topping = ({ title, image, id, toping }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckTopping = () => {
    setChecked(!checked);

    toping.find((item) => item.id === id).checked = !checked;
  };

  return (
    <div onClick={handleCheckTopping}>
      {checked && (
        <Badge pill bg="success" style={{ color: "white" }}>
          &#10004;
        </Badge>
      )}
      <img src={image} alt="toping" width="45px" />
      <p className="text-secondary-color">{title}</p>
    </div>
  );
};

export default Topping;
