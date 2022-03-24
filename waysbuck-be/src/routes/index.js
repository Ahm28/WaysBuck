const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const {
  getCarts,
  deleteCart,
  addCart,
  getCart,
} = require("../controllers/cart");
const {
  addProducts,
  getProducts,
  getProduct,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");
const { getProfile } = require("../controllers/profile");
const {
  addToppings,
  getTopping,
  getToppings,
  updateTopping,
  deleteTopping,
} = require("../controllers/toppings");
const {
  getTransactions,
  addTransactions,
} = require("../controllers/transactions");
const {
  getUsers,
  getUser,
  updateUser,
  addUser,
  deleteUser,
} = require("../controllers/users");
const { auth } = require("../middleware/auth");
const { uploadsFileImage } = require("../middleware/uploadFileImage");

const router = express.Router();

// User Route
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getUser);
// router.post("/user", auth, addUser);
router.patch("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

// Profile Routes
router.get("/profile", auth, getProfile);

// Products Route
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", auth, uploadsFileImage("image"), addProducts);
router.patch("/product/:id", auth, uploadsFileImage("image"), updateProducts);
router.delete("/product/:id", auth, deleteProducts);

//  Toppings Route
router.get("/toppings", getToppings);
router.get("/topping/:id", getTopping);
router.post("/topping", auth, uploadsFileImage("image"), addToppings);
router.patch("/topping/:id", auth, uploadsFileImage("image"), updateTopping);
router.delete("/topping/:id", auth, deleteTopping);

// Auth Route
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// Cart Route
router.get("/carts", auth, getCarts);
router.get("/cart", auth, getCart);
router.post("/cart", auth, addCart);
router.delete("/cart/:id", auth, deleteCart);

router.get("/transactions", auth, getTransactions);
router.post("/transaction", auth, addTransactions);

router.use("/", (req, res) => {
  res.send("Page not found");
});

module.exports = router;
