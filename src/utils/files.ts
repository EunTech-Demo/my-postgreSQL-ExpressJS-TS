import { Request } from "express";

const generateFileNameFromRequest = (arg0: {
  req: Request;
  baseURL: string;
}) => {
  const { req, baseURL } = arg0;
  const filename = req?.file?.filename;

  return `${baseURL}/${filename}`;
};

const isFileUploadedSuccessfully = (req: Request) => {
  return !!req?.file;
};

export { generateFileNameFromRequest, isFileUploadedSuccessfully };
