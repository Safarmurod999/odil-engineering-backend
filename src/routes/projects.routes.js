import { Router } from "express";

import CB from "../controllers/projects.controller.js";

export const projectRouter = Router();

projectRouter.post("/project", CB.POST);
projectRouter.get("/project", CB.GET_ALL);
projectRouter.get("/project/:id", CB.GET);
projectRouter.put("/project/:id", CB.UPDATE);
projectRouter.delete("/project/:id", CB.DELETE);
