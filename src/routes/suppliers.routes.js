import { Router } from "express";
import CB from "../controllers/suppliers.controller.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const suppliersRouter = Router();

suppliersRouter.post("/suppliers", CB.POST);
suppliersRouter.get("/suppliers", CB.GET_ALL);
suppliersRouter.get("/suppliers/:id", CB.GET);
suppliersRouter.put("/suppliers/:id", checkToken, CB.UPDATE);
suppliersRouter.delete("/suppliers/:id", checkToken, CB.DELETE);
