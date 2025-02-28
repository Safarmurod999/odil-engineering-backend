import { Router } from "express";
import CB from "../controllers/leads.controller.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const leadsRouter = Router();

leadsRouter.post("/leads",checkToken, CB.POST);
leadsRouter.get("/leads", CB.GET_ALL);
leadsRouter.get("/leads/:id", CB.GET);
leadsRouter.delete("/leads/:id",checkToken, CB.DELETE);
