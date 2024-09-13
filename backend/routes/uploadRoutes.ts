import express from "express";
import {
  deleteImages,
  getWeddingCatImages,
  postImages,
} from "../controller/uploadController";

const router = express.Router();

router.post("/post-images", postImages);
router.get("/get-wedding-images", getWeddingCatImages);
router.delete("/delete-images", deleteImages);

export default router;
