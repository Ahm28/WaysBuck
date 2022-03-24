const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Access Denied" });
  }

  try {
    const SECRET_KEY = "bebas";
    const verified = jwt.verify(token, SECRET_KEY);

    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Invalid Token" });
  }
};
