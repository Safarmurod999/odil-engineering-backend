import { Router } from "express";

import CB from "../controllers/clients.controller.js";
import { upload } from "../libs/multer.js";

export const clientsRouter = Router();

clientsRouter.post("/clients", upload.single("image"), CB.POST);
clientsRouter.get("/clients", CB.GET_ALL);
clientsRouter.get("/clients/:id", CB.GET);
clientsRouter.put("/clients/:id", upload.single("image"), CB.UPDATE);
clientsRouter.delete("/clients/:id", CB.DELETE);
