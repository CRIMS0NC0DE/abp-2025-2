import { Request, Response, NextFunction } from "express";
import { logger } from "../configs/logger";

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
  });

  res.status(500).json({
    success: false,
    error: "Erro interno do servidor.",
  });
}
