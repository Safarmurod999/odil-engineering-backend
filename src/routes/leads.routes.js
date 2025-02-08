import { Router } from "express";
import CB from "../controllers/leads.controller.js";

export const leadsRouter = Router();

leadsRouter.post("/leads", CB.POST);
leadsRouter.get("/leads", CB.GET_ALL);
leadsRouter.get("/leads/:id", CB.GET);
leadsRouter.put("/leads/:id", CB.UPDATE);
leadsRouter.delete("/leads/:id", CB.DELETE);
