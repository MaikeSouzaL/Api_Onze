import path from "path";
import fs from "fs";
import multer from "multer";

const uploadFolder = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, "_");
    const uniqueName = `${Date.now()}_${sanitized}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
export { uploadFolder };
