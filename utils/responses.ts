import type { Response } from "express";

export function successResponse(
  res: Response,
  data: any,
  message: string = "Success",
  statusCode = 200
): void {
  res.status(statusCode).json({ success: true, message, data });
}

export function errorResponse(
  res: Response,
  statusCode: number,
  error: string
): void {
  res.status(statusCode).json({ success: false, error });
}
