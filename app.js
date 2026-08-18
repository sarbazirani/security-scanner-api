const express = require("express");
const scansRouter = require("./routes/scans.routes");
const errorHandler = require("./middlewares/error.middleware");
const AppError = require("./utils/app-error");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/scans", scansRouter);

app.use((req, res, next) => {
  return next(
    new AppError(`Route ${req.originalUrl} not found`, 404)
  );
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
