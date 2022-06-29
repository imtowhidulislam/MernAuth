import userData from "../models/userData.js";
import jwt from "jsonwebtoken";
import {
  registerAuthenticate,
  loginAuthenticate,
} from "../validation/validation.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

// ? Get All Data :::
export const getAllUser = async (req, res) => {
  try {
    const allUser = await userData.find();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// ? Get single User :::
export const getSingleUser = async (req, res) => {
  const { Id } = req.params;
  try {
    const singleUser = await userData.findOne({ _id: Id });
    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// ? Create a new User :::
export const createUser = async (req, res) => {
  const data = req.body;
  const newUser = new userData(data);
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// ** Registration:::
export const registerUser = async (req, res) => {
  const { error } = registerAuthenticate(req.body);
  console.log(error);
  if (error) return res.status(401).send(error.details[0].message);

  const { email } = req.body;
  const userExist = await userData.findOne({ email: email });
  if (userExist) return res.status(201).send("Email already exist");
  console.log(userExist);

  // ? hashing the password:::
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashPassword);
  const newUser = new userData({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ? Creating a Refresh token for the user???
// ** refreshToken..
let refreshTokens = [];

// !! Generate Access and Refresh Token:::
const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.SEC_PASS, {
    expiresIn: "30s",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.SEC_PASS);
};
export const refreshToken = (req, res) => {
  // * Taking the refresh token from the user:::
  const myRefreshToken = req.body.token;

  // * Send error message if the token is not found or it's invalid:::
  if (!myRefreshToken)
    return res.status(401).json({ msg: "you are not authenticated!!" });

  if (!refreshTokens.includes(myRefreshToken))
    res.status(403).send("Invalid token");

  jwt.sign(myRefreshToken, process.env.REFRESH_PASS, (err, user) => {
    err && console.log(err);

    refreshTokens = refreshTokens.filter((token) => token !== myRefreshToken);
    console.log(user);
    const newAccesshToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);
    res
      .status(200)
      .json({ accessToken: newAccesshToken, myRefreshToken: newRefreshToken });
  });
  // * If everything is ok, create or refresh the token and send it to the user:::
};

// ** Login :::
export const loginUser = async (req, res) => {
  try {
    const { error } = loginAuthenticate(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const { email } = req.body;
    const userExist = await userData.findOne({ email: email });
    if (!userExist) return res.status(400).send("Email not found");

    // ! Checking and dcrypting the password:::
    const dcryptingPass = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!dcryptingPass) return res.status(400).send("Invalid Password");

    // ? Creating a token and assiging the token to a user:::
    /* const accessToken = jwt.sign({ _id: userExist._id }, process.env.SEC_PASS, {
      expiresIn: "30s",
    }); */
    const accessToken = generateAccessToken(userExist);

    // ? Creating Refresh Token and assigning to the user:::
    const myrefreshToken = generateRefreshToken(userExist);
    /* const myrefreshToken = jwt.sign(
      { _id: userExist._id },
      process.env.REFRESH_PASS
    ); */

    // res.header("auth-token", token).json({ status: "ok", userExist: token });
    res.json({
      status: "ok",
      id: userExist._id,
      email: userExist.email,
      token: accessToken,
      myrefreshToken,
    });

    res.status(200).send("User Exist");
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// ? Update a user:::
export const updateUser = async (req, res) => {
  const updateData = req.body;
  const { Id } = req.params;
  try {
    const update = await userData.findOneAndUpdate({ _id: Id }, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(update);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
// ! Delete User :::
export const deleteUser = async (req, res) => {
  const { Id } = req.params;
  try {
    const deleteOne = await userData.findOneAndDelete({ _id: Id });
    res.status(200).json({ deleteOne, msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
