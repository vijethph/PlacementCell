import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token === null) {
    return response.sendStatus(401); // if there is no token, unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, success) => {
    if (error) {
      return response.sendStatus(401); // invalid token, unauthorized
    }
    next();
  });
};
