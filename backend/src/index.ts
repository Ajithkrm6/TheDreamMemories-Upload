import express from "express";
import mySqlPool from "../config";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "../routes/userRoutes";

// config dovenv
dotenv.config();

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());

// routes

app.get("/home", (req, res) => {
  res.status(200).send("<h1>hello home</h1>");
});

app.use("/api", userRouter);

let PORT = parseInt(process.env.PORT || "8081", 10);

mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("mysql is connected");
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });
