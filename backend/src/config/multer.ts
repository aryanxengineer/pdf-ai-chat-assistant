import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const uploadDir = path.resolve("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },

  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `${Date.now()}-${randomUUID()}${ext}`
    );
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (_, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(
        new Error("Only PDF files allowed")
      );
    }

    cb(null, true);
  },
});