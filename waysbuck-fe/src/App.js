import Checkout from "./pages/Checkout";
import Details from "./pages/Details";
import "./style/style.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import { NavbarComponents } from "./Components";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomeAdmin from "./pages/HomeAdmin";
import TransactionAdmin from "./pages/TransactionAdmin";
import AddProduct from "./Components/AddProduct";
import AddTopping from "./Components/AddTopping";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { useContext, useEffect } from "react";
import UpdateProduct from "./pages/UpdateProduct";
import PageNotFound from "./Components/PageNotFound";
import PrivateRoute from "./Components/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/admin");
      } else if (state.user.status === "costumer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   {/* <Route path="/details" element={<Details />} /> */}
    //   <Route path="/product/:id" element={<Details />} />
    //   <Route path="/checkout" element={<Checkout />} />
    //   <Route path="/profile" element={<Profile />} />

    //   {/* Admin Pages */}
    //   <Route path="/admin" element={<HomeAdmin />} />
    //   <Route path="/admin/add-product" element={<AddProduct />} />
    //   <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
    //   <Route path="/admin/add-toping" element={<AddTopping />} />
    //   <Route path="/admin/transactions" element={<TransactionAdmin />} />
    // </Routes>

    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/auth" element={<Auth />} /> */}

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/product/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        {/* Admin Pages */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/add-toping" element={<AddTopping />} />
        <Route path="/admin/update-product/:id" element={<UpdateProduct />} />

        <Route path="/admin/transactions" element={<TransactionAdmin />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>

    // </BrowserRouter>
  );
}

export default App;
