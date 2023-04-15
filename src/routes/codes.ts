import { Request, Response, Router } from "express";
import { logger } from "../logger";
import axios, { AxiosResponse } from "axios";
import { authenticateToken } from "../authenticate";

interface IWebhookResponse {
  request_status?: {
    message?: string;
    code?: string;
  };
  errors?: {
    quota?: number;
    current_count?: number;
  };
  he_id?: string;
  status_update_url?: string;
  context?: string;
  result?: {
    run_status?: {
      memory_used?: string;
      status?: string;
      time_used?: string;
      signal?: string;
      exit_code?: string;
      status_detail?: string;
      stderr?: string;
      output?: string;
      request_NOT_OK_reason?: string;
      request_OK?: string;
    };
    compile_status?: string;
  };
}

export const codeRouter = Router();
let compileStatus = "";
let runStatus = "";

// ping authenticated route for both compilation and run status
codeRouter.get("/events", authenticateToken, async (request: Request, response: Response) => {
  try {
    if (compileStatus === "" && runStatus === "") {
      response.status(204).json({
        message: "No Content",
      });
    } else {
      response.status(200).json({
        compileStatus,
        runStatus,
      });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

// listener route for webhook response, no auth required
codeRouter.post("/events", async (request: Request<{}, {}, IWebhookResponse>, response: Response) => {
  try {
    if (request.body && request.body.request_status?.code === "CODE_COMPILED" && request.body.result?.compile_status) {
      compileStatus = request.body.result?.compile_status;
    } else if (request.body && request.body.request_status?.code === "REQUEST_COMPLETED" && request.body.result?.run_status) {
      const codeResponse = await axios.get(request.body.result.run_status.output || "", {
        responseType: "blob",
      });
      runStatus = codeResponse.data;
    } else {
      response.status(400).json({
        message: "Bad request",
      });
    }
    response.sendStatus(200).end();
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

// post data for code evaluation
codeRouter.post("/", authenticateToken, async (request: Request, response: Response) => {
  try {
    logger.info({ soembody: request.body }, "request body");
    const evaluationResponse: AxiosResponse<IWebhookResponse> = await axios.post("https://api.hackerearth.com/v4/partner/code-evaluation/submissions/", request.body, {
      headers: {
        "Content-Type": "application/json",
        "client-secret": process.env.HACKEREARTH_API_KEY,
      },
    });

    response.status(202).json({
      message: "Request queued for evaluation",
      requestId: evaluationResponse.data.he_id,
    });
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

// optional endpoint to manually get code evaluation status
codeRouter.get("/:id", authenticateToken, async (request: Request, response: Response) => {
  try {
    const evaluationResponse: AxiosResponse<IWebhookResponse> = await axios.get(`https://api.hackerearth.com/v4/partner/code-evaluation/submissions/${request.params.id}`, {
      headers: {
        "Content-Type": "application/json",
        "client-secret": process.env.HACKEREARTH_API_KEY,
      },
    });

    response.status(200).json({
      requestStatus: evaluationResponse.data.request_status,
      requestId: evaluationResponse.data.he_id,
      context: evaluationResponse.data.context,
      errors: evaluationResponse.data.errors,
      result: evaluationResponse.data.result,
    });
  } catch (error) {
    logger.error(error);
    response.status(500).json({
      message: error,
    });
  }
});

codeRouter.get("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "GET operation not supported on /codes",
    })
    .end()
);

codeRouter.put("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "PUT operation not supported on /videos",
    })
    .end()
);

codeRouter.delete("/", (request: Request, response: Response) =>
  response
    .status(405)
    .send({
      message: "DELETE operation not supported on /videos",
    })
    .end()
);
