import jwt from "jsonwebtoken";
import "dotenv/config";

const authentication = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("You are not authentic user");

  try {
    const verifyToken = jwt.verify(token, process.env.SEC_PASS);
    req.userExit = verifyToken;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
export default authentication;
