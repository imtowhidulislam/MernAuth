import express from "express";
import authentication from "../auth/authenticate.js";
const router = express.Router();

import {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  refreshToken,
} from "../controllers/userControl.js";

router.get("/", getAllUser);
router.post("/", createUser);
router.post("/refresh", refreshToken);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:Id", getSingleUser);
router.patch("/:Id", updateUser);
router.delete("/:Id", authentication, deleteUser);

export default router;
