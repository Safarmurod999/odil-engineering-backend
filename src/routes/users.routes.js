import { Router } from "express";

import CB from "../controllers/users.controller.js";
import { checkUser } from "../middlewares/users.middleware.js";
import { upload } from "../libs/multer.js";

export const usersRouter = Router();

usersRouter.post("/signup", CB.SIGNUP);
usersRouter.post("/signin", checkUser, CB.SIGNIN);

usersRouter.post("/users", upload.single("avatar"), CB.POST);
usersRouter.get("/users", CB.GET_ALL);
usersRouter.get("/users/:id", CB.GET);
usersRouter.put("/users/:id", upload.single("avatar"), CB.UPDATE);
usersRouter.delete("/users/:id", CB.DELETE);
