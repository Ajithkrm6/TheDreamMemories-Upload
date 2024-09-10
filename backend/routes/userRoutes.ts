import express from "express";
// import getUser from '../controller/userController'
// import createUser from '../controller/userController'
import {
  createUser,
  getUsers,
  getParticularUser,
  loginUser,
  deleteUser,
  deleteParticularUser,
} from "../controller/userController";

const router = express.Router();

router.post("/createuser", createUser);
router.get("/getusers", getUsers);
router.get("/getuser/:id", getParticularUser);
router.get("/login", loginUser);
router.delete("/deleteusers", deleteUser);
router.delete("/deleteParticularUser", deleteParticularUser);

export default router;
