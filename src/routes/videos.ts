import { Request, Response, Router } from "express";
import { logger } from "../logger";
import { authenticateToken } from "../authenticate";
import { Video } from "../models/Video";

export const videosRouter = Router();

videosRouter.get("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    const questionsResponse = await Video.find({});

    if (questionsResponse) {
      response.status(200).json(questionsResponse);
    } else {
      response.status(404).json({
        message: "Quiz questions aren't available",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

videosRouter.post("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "POST operation not supported on /videos",
    })
    .end()
);

videosRouter.put("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "PUT operation not supported on /videos",
    })
    .end()
);

videosRouter.delete("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "DELETE operation not supported on /videos",
    })
    .end()
);
