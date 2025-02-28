import { Router } from "express";

import CB from "../controllers/users.controller.js";
import { checkToken, checkUser } from "../middlewares/users.middleware.js";
import { upload } from "../libs/multer.js";

export const usersRouter = Router();

usersRouter.post("/signup", CB.SIGNUP);
usersRouter.post("/signin", checkUser, CB.SIGNIN);

usersRouter.post("/users", upload.single("avatar"), CB.POST);
usersRouter.get("/users", checkToken, CB.GET_ALL);
usersRouter.get("/users/:id", checkToken, CB.GET);
usersRouter.put("/users/:id", checkToken, upload.single("avatar"), CB.UPDATE);
usersRouter.delete("/users/:id", checkToken, CB.DELETE);
