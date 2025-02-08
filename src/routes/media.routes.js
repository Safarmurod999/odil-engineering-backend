import { Router } from "express";

import CB from "../controllers/media.controller.js";

export const mediaRouter = Router();

mediaRouter.post("/media", CB.POST);
mediaRouter.get("/media", CB.GET_ALL);
mediaRouter.get("/media/:id", CB.GET);
mediaRouter.put("/media/:id", CB.UPDATE);
mediaRouter.delete("/media/:id", CB.DELETE);
