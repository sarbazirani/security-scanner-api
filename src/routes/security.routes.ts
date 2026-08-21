import { Router } from "express";
import { deleteCookie, setCookie } from "../controllers/security.controller";

const securityRouter = Router();

securityRouter.get("/cookie-demo",setCookie);
securityRouter.delete("/cookie-demo",deleteCookie);

export default securityRouter;