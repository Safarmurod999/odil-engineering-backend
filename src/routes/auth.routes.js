import { Router } from "express";

import CB from "../controllers/users.controller.js";
import { checkUser } from "../middlewares/users.middleware.js";
import { upload } from "../libs/multer.js";

export const authRouter = Router();

authRouter.post("/signup", upload.single("avatar"), CB.POST);
authRouter.post("/signin", checkUser, CB.SIGNIN);

authRouter.get("/users", CB.GET);
authRouter.put("/users", upload.single("avatar"), CB.UPDATE);
authRouter.delete("/users/:id", CB.DELETE);
