import express from "express";
import scansRouter from "./routes/scans.routes";
import errorHandler from "./middlewares/error.middleware";
import AppError from "./utils/app-error";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/scans", scansRouter);

app.use((req, res, next) => {
  next(
    new AppError(`Route ${req.originalUrl} not found`, 404)
  );
});

app.use(errorHandler);

export default app;