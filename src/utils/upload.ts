import multer from "multer";

const fileUploader = (uploadPath: string, allowFileTypes: string[]) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
      // Save the file with its original name or customize it
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // File filter for images only
  const fileFilter = (_, file, cb) => {
    const allowedTypes = allowFileTypes;
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  };

  return multer({ storage, fileFilter });
};

export { fileUploader };
