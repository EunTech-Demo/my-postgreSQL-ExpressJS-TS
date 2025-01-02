import { responseJSONTemplate } from "@/utils/api";
import { NextFunction, Response, Request } from "express";

const defaultErrorMiddleware = (err: any, req: Request, res: Response) => {
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
