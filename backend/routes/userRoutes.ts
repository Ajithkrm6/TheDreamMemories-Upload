import express from "express";
// import getUser from '../controller/userController'
// import createUser from '../controller/userController'
import {
  createUser,
  getUsers,
  getParticularUser,
  loginUser,
  deleteUser,
  deleteUserByEmail,
} from "../controller/userController";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getParticularUser);
router.get("/login", loginUser);
router.delete("/delete-users", deleteUser);
router.delete("/delete-user-by-email", deleteUserByEmail);

export default router;
