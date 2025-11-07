import { Router } from "express";
import { upload } from "../config/upload.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = Router();

router.get("/heart", (req, res) => {
  res.send("🚀 Servidor Express Online");
});

router.post("/upload", upload.single("image"), uploadImage);

export default router;
