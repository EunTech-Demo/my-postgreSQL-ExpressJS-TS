import { responseJSONTemplate } from "@/utils/api";
import { NextFunction, Response, Request } from "express";

const defaultErrorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: any
) => {
  console.error(`[ERROR: defaultErrorMiddleware] ${err}`);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.json({
    ...responseJSONTemplate({
      success: false,
      error: message,
      data: null,
      message: null,
      status: statusCode,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    }),
  });
};

export default defaultErrorMiddleware;
