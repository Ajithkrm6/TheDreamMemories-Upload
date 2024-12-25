import express from "express";
// import getUser from '../controller/userController'
// import createUser from '../controller/userController'
import {
  createUser,
  getUsers,
  getUserById,
  loginUser,
  deleteUser,
  deleteUserByEmail,
  generateNewAccessToken,
} from "../controller/userController";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getUserById);
router.post("/login", loginUser);
router.post("generate-new-access-token", generateNewAccessToken);
router.delete("/delete-users", deleteUser);
router.delete("/delete-user-by-email", deleteUserByEmail);

export default router;
