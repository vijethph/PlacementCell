import { Request, Response, Router } from "express";
import { logger } from "../logger";
import { authenticateToken } from "../authenticate";
import { Company } from "../models/Company";

export const companiesRouter = Router();

companiesRouter.get("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    const companiesResponse = await Company.find({});

    if (companiesResponse) {
      response.status(200).json(companiesResponse);
    } else {
      response.status(404).json({
        message: "Companies do not exist",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

companiesRouter.post("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "POST operation not supported on /companies",
    })
    .end()
);

companiesRouter.put("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "PUT operation not supported on /companies",
    })
    .end()
);

companiesRouter.delete("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "DELETE operation not supported on /companies",
    })
    .end()
);
