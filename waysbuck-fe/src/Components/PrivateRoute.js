// import necessary utility from rrd
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

// create component here
import React, { useContext } from "react";
import swal from "sweetalert";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ element: component, ...rest }) => {
  // const button = <Link to="/">Back To Home</Link>;
  let navigate = useNavigate();
  // const isLogin = false;

  const [state, dispatch] = useContext(UserContext);

  return state?.isLogin ? (
    <Outlet />
  ) : (
    swal({
      title: "Error",
      text: "Login First",
      icon: "error",
    })
  );
};

export default PrivateRoute;
