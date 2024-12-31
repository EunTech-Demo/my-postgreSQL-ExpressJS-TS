import multer from "multer";

const fileUploader = (
  uploadPath: string,
  allowFileTypes: string[],
  errorMessage?: string,
  keyOfFileName?: string
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
      const fileName = keyOfFileName
        ? `${req.body?.[keyOfFileName]}.jpg`
        : file.originalname;
      cb(null, `${fileName}`);
    },
  });

  // File filter for images only
  const fileFilter = (_, file, cb) => {
    const allowedTypes = allowFileTypes;
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(errorMessage || "Only image files are allowed!"), false);
    }
  };

  return multer({ storage, fileFilter });
};

export { fileUploader };
