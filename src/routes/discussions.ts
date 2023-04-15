import { Request, Response, Router } from "express";
import { logger } from "../logger";
import { authenticateToken } from "../authenticate";
import { Discussion } from "../models/Discussion";
import mongoose from "mongoose";

export const discussionsRouter = Router();

discussionsRouter.get("/comments", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionResponse = await Discussion.findById(request.body.discussionId);

    if (discussionResponse) {
      response.status(200).json(discussionResponse.comments);
    } else {
      response.status(404).json({
        message: "No discussion and comments available",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

discussionsRouter.post("/comments", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionSearchResponse = await Discussion.findById(request.body.discussionId);

    if (discussionSearchResponse) {
      discussionSearchResponse.comments.push({
        _id: new mongoose.Types.ObjectId(),
        comment: request.body.comment,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
      });

      const discussionUpdateResponse = await discussionSearchResponse.save();
      response.status(200).json(discussionUpdateResponse);
    } else {
      response.status(404).json({
        message: "Discussion not found",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

discussionsRouter.put("/comments", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionSearchResponse = await Discussion.findById(request.body.discussionId);

    if (discussionSearchResponse) {
      const commentPosition = discussionSearchResponse.comments.findIndex((comment) => comment._id.toString() === request.body.commentId);

      if (commentPosition !== -1 && discussionSearchResponse.comments[commentPosition].email === request.body.email) {
        discussionSearchResponse.comments[commentPosition].comment = request.body.comment;
        const discussionUpdateResponse = await discussionSearchResponse.save();
        response.status(200).json(discussionUpdateResponse);
      } else {
        return response.status(403).json({
          message: "You are not authorized to perform this operation",
        });
      }
    } else {
      response.status(404).json({
        message: "Discussion not found",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

discussionsRouter.delete("/comments", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionSearchResponse = await Discussion.findById(request.body.discussionId);

    if (discussionSearchResponse) {
      const commentPosition = discussionSearchResponse.comments.findIndex((comment) => comment._id.toString() === request.body.commentId);

      if (commentPosition !== -1 && discussionSearchResponse.comments[commentPosition].email === request.body.email) {
        discussionSearchResponse.comments.splice(commentPosition, 1);

        const discussionUpdateResponse = await discussionSearchResponse.save();
        response.status(200).json(discussionUpdateResponse);
      } else {
        return response.status(403).json({
          message: "You are not authorized to perform this operation",
        });
      }
    } else {
      response.status(404).json({
        message: "Discussion not found",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

discussionsRouter.get("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionsResponse = await Discussion.find({});

    if (discussionsResponse) {
      response.status(200).json(discussionsResponse);
    } else {
      response.status(404).json({
        message: "Discussion not found",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

discussionsRouter.post("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionCreateResponse = await Discussion.create({
      title: request.body.title,
      description: request.body.description,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
    });

    if (discussionCreateResponse) {
      response.status(201).json(discussionCreateResponse);
    } else {
      response.status(409).json({
        message: "Discussion conflict, cannot be published",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

discussionsRouter.put("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionSearchResponse = await Discussion.findById(request.body.discussionId);

    if (discussionSearchResponse) {
      logger.info(discussionSearchResponse);
      if (discussionSearchResponse.email === request.body.email) {
        // alternative: findOneAndUpdate could've been used
        const discussionUpdateResponse = await Discussion.findByIdAndUpdate(
          request.body.discussionId,
          {
            $set: {
              title: request.body.title,
              description: request.body.description,
            },
          },
          {
            new: true,
          }
        );

        response.status(200).json(discussionUpdateResponse);
      } else {
        return response.status(403).json({
          message: "You are not authorized to perform this operation",
        });
      }
    } else {
      response.status(404).json({
        message: "Discussion not found",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

discussionsRouter.delete("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    const discussionSearchResponse = await Discussion.findById(request.body.discussionId);

    if (discussionSearchResponse) {
      if (discussionSearchResponse.email === request.body.email) {
        // alternative: findOneAndDelete could've been used
        const discussionDeleteResponse = await Discussion.findByIdAndDelete(request.body.discussionId);

        response.status(200).json(discussionDeleteResponse);
      } else {
        return response.status(403).json({
          message: "You are not authorized to perform this operation",
        });
      }
    } else {
      response.status(404).json({
        message: "Discussion not found",
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});
