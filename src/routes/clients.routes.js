import { Router } from "express";

import CB from "../controllers/clients.controller.js";
import { upload } from "../libs/multer.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const clientsRouter = Router();

clientsRouter.post("/clients",checkToken, upload.single("image"), CB.POST);
clientsRouter.get("/clients", CB.GET_ALL);
clientsRouter.get("/clients/:id", CB.GET);
clientsRouter.put("/clients/:id",checkToken, upload.single("image"), CB.UPDATE);
clientsRouter.delete("/clients/:id",checkToken, CB.DELETE);
