import type { NextFunction, Request, Response } from "express";
import { initializeRedisClient } from "../utils/client.js";
import { restaurantKeyById } from "../utils/keys.js";
import { errorResponse } from "../utils/responses.js";

export const checkRestaurantId = async (
  req: Request<{ restaurantId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { restaurantId } = req.params;
  if (!restaurantId) {
    return errorResponse(res, 400, "Restaurant ID is required");
  }
  try {
    const client = await initializeRedisClient();
    const restaurantKey = restaurantKeyById(restaurantId);
    const exists = await client.exists(restaurantKey);
    if (!exists) {
      return errorResponse(res, 404, "Restaurant not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};
