import { Router } from "express";

import CB from "../controllers/media.controller.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const mediaRouter = Router();

mediaRouter.post("/media", checkToken, CB.POST);
mediaRouter.get("/media", CB.GET_ALL);
mediaRouter.get("/media/:id", CB.GET);
mediaRouter.put("/media/:id", checkToken, CB.UPDATE);
mediaRouter.delete("/media/:id", checkToken, CB.DELETE);
