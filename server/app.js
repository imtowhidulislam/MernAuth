import "dotenv/config";
import cors from "cors";
import exprss from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";

const app = exprss();
const port = 3001;

// ? Setting up the MiddleWares:::
app.use(cors());
app.use(bodyParser.json());
app.use("/api/user", userRoute);

// * Connecting To the Server:::
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

app.listen(port, () => console.log(`Server is runnin on port ${port}`));
