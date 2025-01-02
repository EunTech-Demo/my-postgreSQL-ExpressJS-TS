import { responseJSONTemplate } from "@/utils/api";
import { NextFunction, Response, Request } from "express";

const defaultErrorMiddleware = (
  err: {
    status: number;
    message: string;
    stack: string;
  },
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR: defaultErrorMiddleware] ${err}`);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    ...responseJSONTemplate({
      success: false,
      error: message,
      data: null,
      message: null,
      status: statusCode,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }), // Include stack trace in non-production
    }),
  });
};

export default defaultErrorMiddleware;
