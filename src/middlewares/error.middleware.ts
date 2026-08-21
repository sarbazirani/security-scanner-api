import { ErrorRequestHandler } from "express";
import AppError from "../utils/app-error";
const errorHandler:ErrorRequestHandler = (err, req,res,next) => {
  console.error(err);
  if(err instanceof AppError){
    const message =
      err.statusCode === 500
        ? "Internal server error"
        : err.message;
    return res.status(err.statusCode).json({
      error: message,
    });
  }else if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON body",
    });
  }else if (err?.type === "entity.too.large") {
    return res.status(413).json({
      error: "Request body is too large",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
}

export default errorHandler;