import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { logger } from "../logger";
import { User } from "../models/User";

export const usersRouter = Router();

interface IUserPayload {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

usersRouter.post("/register", async (request: Request, response: Response) => {
  try {
    const userSearchResponse = await User.findOne({
      email: request.body.email,
    });

    if (!userSearchResponse) {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      const userCreateResponse = await User.create({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: hashedPassword,
        creationDate: new Date(),
      });

      response.status(201).json({
        message: `${userCreateResponse.email} registered successfully`,
      });
    } else {
      response.status(409).json({
        message: "User already exists",
      });
    }
  } catch (error: unknown) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

usersRouter.post("/login", async (request: Request, response: Response) => {
  try {
    const userSearchResponse = await User.findOne({
      email: request.body.email,
    });

    if (userSearchResponse) {
      const compareResponse = await bcrypt.compare(request.body.password, userSearchResponse.password);
      if (compareResponse) {
        // passwords match
        const token = jwt.sign(
          {
            _id: userSearchResponse._id,
            firstName: userSearchResponse.firstName,
            lastName: userSearchResponse.lastName,
            email: userSearchResponse.email,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 1440,
          }
        );
        response.status(200).send({ token });
      } else {
        // passwords don't match
        response.status(401).json({
          message: "Wrong password",
        });
      }
    } else {
      response.status(404).json({
        message: "User does not exist",
      });
    }
  } catch (error: unknown) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

usersRouter.get("/profile", async (request: Request, response: Response) => {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token || token === null) {
      return response.status(401).json({
        message: "Unauthorized",
      }); // if there is no token, unauthorized
    }

    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userSearchResponse = await User.findOne({
      _id: (decodedPayload as IUserPayload)._id,
    });

    if (userSearchResponse) {
      response.status(200).json(userSearchResponse);
    } else {
      response.status(404).json({
        message: "User does not exist",
      });
    }
  } catch (error: unknown) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});
