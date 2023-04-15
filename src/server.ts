import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { join } from "path";
import mongoose from "mongoose";
import { logger } from "./logger";
import { usersRouter } from "./routes/users";
import { companiesRouter } from "./routes/companies";
import { videosRouter } from "./routes/videos";
import { questionsRouter } from "./routes/questions";
import { discussionsRouter } from "./routes/discussions";
import { codeRouter } from "./routes/codes";

dotenv.config();

const app: express.Application = express();
const httpServer = createServer(app);
const serverPort = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors()
  //   {
  //   origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  //   credentials: true,
  // }
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info("MongoDB Connected"))
  .catch((error) => logger.error(error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(join(__dirname, "/public")));

app.use("/v1/users", usersRouter);
app.use("/v1/companies", companiesRouter);
app.use("/v1/videos", videosRouter);
app.use("/v1/quiz", questionsRouter);
app.use("/v1/discussions", discussionsRouter);
app.use("/v1/codes", codeRouter);

// healthcheck route
app.get("/health", (request: Request, response: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "OK",
    date: new Date(),
  };

  response.status(200).send(data);
});

// 404 route
app.get("*", (request: Request, response: Response) => {
  response.status(404).send("Unable to find the requested resource");
});

httpServer.listen(serverPort, () => {
  logger.info(`Server listening on port ${serverPort}`);
});
