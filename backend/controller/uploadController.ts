import { Request, Response } from "express";
import mySqlPool from "../config";
import upload from "../middleware/multerConfig";
import mysql from "mysql2/promise";
import path from "path";
import fs from "fs";

export const postImages = async (req: Request, res: Response) => {
  upload.array("image_url")(req, res, async (err: any) => {
    if (err) {
      return res.status(500).send({ status: "failed", message: err });
    }
    const category = req.body.category;
    const description = req.body.description;
    const client_name = req.body.client_name;

    const files = req.files as Express.Multer.File[];

    console.log("category", category);
    console.log("description", description);
    console.log("client_name", client_name);

    if (!files || files.length === 0) {
      return res
        .status(404)
        .send({ status: "failed", message: "No files found to upload" });
    }
    let tableName;
    switch (category) {
      case "Wedding":
        tableName = "wedding_photography";
        break;
      case "Children-photography":
        tableName = "children_photography";
        break;
      case "Meternity-photography":
        tableName = "meternity_photography";
        break;
      case "Parties":
        tableName = "parties";
        break;
      default:
        return res
          .status(404)
          .send({ status: "failed", message: "no category selected" });
    }

    const query = `INSERT INTO ${mysql.escapeId(
      tableName
    )} (image_url, uploaded_date, description, client_name) VALUES ?`;
    const values = files.map((file) => [
      `../uploads/${category}/${file.filename}`,
      new Date(),
      description,
      client_name || null,
    ]);

    try {
      const [result]: any = await mySqlPool.query(query, [values]);
      files.forEach((file) => {
        const filePath = path.join(
          __dirname,
          "../uploads",
          category,
          file.filename
        );
        fs.unlink(filePath, (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Deleted file : ", filePath);
          }
        });
      });

      return res.status(201).send({
        status: "success",
        message: `Uploded Successfully..!`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: "failed", message: err });
    }
  });
};

export const getWeddingCatImages = async (req: Request, res: Response) => {
  try {
    const [result] = await mySqlPool.query("SELECT * FROM wedding_photography");
    return res.status(201).send({
      status: "success",
      message: "successfuly fetched the images from wedding table",
      data: [result],
    });
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: "failed to fetch the imges from wedding_photography table",
    });
  }
};

export const getchildrenCatImages = async (req: Request, res: Response) => {
  try {
    const [result] = await mySqlPool.query(
      "SELECT * FROM children_photography"
    );
    return res.status(201).send({
      status: "success",
      message: "successfuly fetched the images from children_photography table",
      data: [result],
    });
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: "failed to fetch the imges from children_photography table",
    });
  }
};

export const getMaternityCatImages = async (req: Request, res: Response) => {
  try {
    const [result] = await mySqlPool.query(
      "SELECT * FROM maternity_photography"
    );
    return res.status(201).send({
      status: "success",
      message:
        "successfuly fetched the images from maternity_photography table",
      data: [result],
    });
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: "failed to fetch the imges from maternity_photography table",
    });
  }
};

export const getPartiesCatImages = async (req: Request, res: Response) => {
  try {
    const [result] = await mySqlPool.query("SELECT * FROM parties");
    return res.status(201).send({
      status: "success",
      message: "successfuly fetched the images from parties table",
      data: [result],
    });
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: "failed to fetch the imges from parties table",
    });
  }
};

export const deleteImages = async (req: Request, res: Response) => {
  try {
    const { client_name, category } = req.body;
    console.log("clinet-name", client_name);
    console.log("category", category);
    let tableName;
    switch (category) {
      case "Wedding":
        tableName = "wedding_photography";
        break;
      case "Children-photography":
        tableName = "children_photography";
        break;
      case "Meternity-photography":
        tableName = "meternity_photography";
        break;
      case "Parties":
        tableName = "parties";
        break;
      default:
        return res
          .status(404)
          .send({ status: "failed", message: "no category selected" });
    }
    console.log(tableName);
    const result = await mySqlPool.query(
      `DELETE FROM ${tableName} WHERE client_name = ? `,
      [client_name]
    );

    return res.status(201).send({
      status: "success",
      message: `Deleted the image with ${client_name} client_name`,
    });
  } catch (err) {
    return res.status(500).send({ status: "failed", message: err });
  }
};

export const updateImages = (req: Request, res: Response) => {
  try {
  } catch (err) {
    return res.status(500).send({ status: "failed", message: err });
  }
};
