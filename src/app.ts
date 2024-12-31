import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";

import usersRouter from "./routers/usersRouter";
import studentsRouter from "./routers/studentsRouter";
import { ROUTES_CONFIG, PATH_PREFIXES } from "@/configs/routers.config";
import {
  PORT,
  FILE_PATH,
  STUDENT_IMG_PATH,
  ALLOWED_IMAGE_TYPES,
} from "@/server.config";
import { fileUploader } from "./utils/upload";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = STUDENT_IMG_PATH;
    cb(null, uploadPath); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    // Save the file with its original name or customize it
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ALLOWED_IMAGE_TYPES;
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// access files via URL : http://localhost:3002/files/images/students/????.jpg
app.use("/files", express.static(FILE_PATH));

// Middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (_, res) => {
  res.send("pong");
});

// /api
app.use(`${PATH_PREFIXES.API}${ROUTES_CONFIG.USERS.baseURL}`, usersRouter);
app.use(
  `${PATH_PREFIXES.API}${ROUTES_CONFIG.STUDENTS.baseURL}`,
  studentsRouter
);

app.post(
  "/upload",
  fileUploader(STUDENT_IMG_PATH, ALLOWED_IMAGE_TYPES).single("student_image"),
  (req: Request, res: Response) => {
    console.log(" student_info: ", req.body);
    if (!req.file) {
      res
        .status(400)
        .json({ message: "No file uploaded or invalid file type." });
    }

    res.status(200).json({
      message: "File uploaded successfully!",
      filePath: `http://127.0.0.1:${PORT}/files/images/students/${req.file.filename}`,
    });
  }
);

app.get(
  "/test1",
  (_, res, next) => {
    console.log("-- MIDDLEWARE_1");
    next();
  },
  (_, res, next) => {
    console.log("-- MIDDLEWARE_2");
    next();
  },
  (_, res, next) => {
    console.log("-- MIDDLEWARE_3");
    next();
  },
  (_, res) => {
    console.log("-- MIDDLEWARE_4: ", _.body);
    res.send("--- JJ");
  }
);

app.listen(PORT, () => {
  console.log(`[server] Application is listening on port ${PORT}`);
  console.log('[Server] uploads are located in "' + FILE_PATH + '"');
});
