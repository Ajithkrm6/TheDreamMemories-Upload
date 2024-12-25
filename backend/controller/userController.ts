import { Request, Response } from "express";
import mySqlPool from "../config";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt, { Secret, VerifyErrors, JwtPayload } from "jsonwebtoken";

dotenv.config();
const JWT_Secret: Secret = process.env.JWT_ACCESS_SECRET || "default_Secret";
const REFRESH_TOKEN_JWT_SECRET: Secret =
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, bio, social_links } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("All fields are required");
  }
  try {
    // const data = await mySqlPool.query("SELECT * FROM users");
    // console.log("data lnth", data.length);
    // if (data.length >= 1) {
    //   return res
    //     .status(404)
    //     .send({ status: "failed", message: "Only one user is allowed" });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await mySqlPool.query(
      "INSERT INTO users (username,email,password,bio,social_links) VALUES (? , ? , ? , ? , ?)",
      [username, email, hashedPassword, bio, JSON.stringify(social_links)]
    );
    console.log("user created");
    res.status(201).send({
      sucess: "success",
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error inserting user data");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await mySqlPool.query("TRUNCATE TABLE users");
    return res
      .status(201)
      .send({ status: "success", message: "Successfully deleted all users." });
  } catch (err) {
    res
      .status(500)
      .send({ status: "failed", message: "failed to all users from table" });
  }
};

export const deleteUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const [userResult]: any = await mySqlPool.query(
      "SELECT * FROM users WHERE email = ? ",
      [email]
    );
    if (userResult.length === 0) {
      return res
        .status(404)
        .send({ status: "failed", messages: "user not found" });
    }
    const [deleteResult]: any = await mySqlPool.query(
      "DELETE FROM users WHERE email = ? ",
      [email]
    );
    if (deleteResult.affectedRows === 0) {
      res.status(404).send({ status: "failed", messages: "user not found" });
    }
    const [result]: any = await mySqlPool.query(
      "SELECT MAX(id) as maxId FROM users"
    );
    const maxId = result[0]?.maxId || 0;
    await mySqlPool.query("ALTER TABLE users AUTO_INCREMENT=?", [maxId + 1]);
    return res
      .status(201)
      .send({ status: "success", message: "Deleted user by email" });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "Failed to delte a user with given id",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await mySqlPool.query("SELECT * FROM users");
    if (!data) {
      res.status(404).send({
        status: "failed",
        message: "No records found",
      });
    }
    res.status(201).send({
      status: "success",
      message: "Found users",
      users: data[0],
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: "Error in getting the user",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send({
        status: "failed",
        message: "Expected to pass a id",
      });
    }
    const data = await mySqlPool.query(`SELECT * FROM users WHERE id=?`, [id]);
    res.status(201).send({
      status: "success",
      message: "found the user",
      data: data[0],
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: err,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({
      status: "failed",
      messsage: "Need email and passsword.",
    });
  }
  try {
    const [result]: any = await mySqlPool.query(
      `SELECT * FROM users WHERE email=?`,
      [email]
    );
    const user = result[0];
    console.log("user", user);
    if (!user) {
      return res
        .status(404)
        .send({ status: "failed", message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .send({ status: "failed", message: "Invalid username or password" });
    }
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_Secret,
      {
        expiresIn: "2h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      REFRESH_TOKEN_JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // shoule be true in production example process.env.NODE_ENV === "production";
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // max age is 1 week
    });

    return res
      .status(201)
      .send({ status: "success", message: "Login successful", accessToken });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      error: err,
    });
  }
};

// synchronous method:

export const generateNewAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .send({ status: "failed", message: "No refresh token found" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_JWT_SECRET
    ) as JwtPayload;

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      JWT_Secret,
      {
        expiresIn: "2h",
      }
    );

    return res.status(201).send({ status: "success", newAccessToken });
  } catch (err) {
    return res
      .status(401)
      .send({ status: "failed", message: "Invalid Refresh Token" });
  }
};

// callback based

// export const generateNewAccessToken = (req: Request, res: Response) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) {
//     return res
//       .status(401)
//       .send({ status: "failed", message: "No refresh token found" });
//   }

//   jwt.verify(
//     refreshToken,
//     REFRESH_TOKEN_JWT_SECRET,
//     (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
//       if (err) {
//         return res
//           .status(401)
//           .send({ status: "failed", message: "Invalid Refresh Token" });
//       }
//       if (!decoded || typeof decoded === "string") {
//         return res
//           .status(401)
//           .send({ status: "failed", message: "Invalid token payload" });
//       }

//       const newAccessToken = jwt.sign(
//         { id: decoded.id, email: decoded.email },
//         JWT_Secret,
//         {
//           expiresIn: "2h",
//         }
//       );

//       return res.status(201).send({ status: "Success", newAccessToken });
//     }
//   );
// };
