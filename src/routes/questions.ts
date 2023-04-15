import { Request, Response, Router } from "express";
import { logger } from "../logger";
import { authenticateToken } from "../authenticate";
import { Quiz } from "../models/Quiz";

export const questionsRouter = Router();

questionsRouter.get("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    const questionsResponse = await Quiz.find({});

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

questionsRouter.post("/", authenticateToken, async (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "POST operation not supported on /questions",
    })
    .end()
);

questionsRouter.put("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "PUT operation not supported on /questions",
    })
    .end()
);

questionsRouter.delete("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "DELETE operation not supported on /questions",
    })
    .end()
);
