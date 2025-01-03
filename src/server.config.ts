import path from "path";

const PORT = (process?.env?.PORT || 3002) as number;
const FILE_PATH = path.join(__dirname, "public");
const STUDENT_IMG_PATH = path.join(__dirname, "public/images/students");
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const STUDENT_IMAGE_BASE_URL = `/files/images/students`;

export {
  PORT,
  FILE_PATH,
  STUDENT_IMG_PATH,
  ALLOWED_IMAGE_TYPES,
  STUDENT_IMAGE_BASE_URL,
};
