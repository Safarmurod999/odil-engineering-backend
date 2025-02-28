import { Router } from "express";

import CB from "../controllers/projects.controller.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const projectRouter = Router();

projectRouter.post("/project",checkToken, CB.POST);
projectRouter.get("/project", CB.GET_ALL);
projectRouter.get("/project/:id", CB.GET);
projectRouter.put("/project/:id",checkToken, CB.UPDATE);
projectRouter.delete("/project/:id",checkToken, CB.DELETE);
