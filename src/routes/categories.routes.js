import { Router } from "express";

import CB from "../controllers/categories.controller.js";
import { upload } from "../libs/multer.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const categoriesRouter = Router();

categoriesRouter.post("/categories",checkToken, upload.single("image"), CB.POST);
categoriesRouter.get("/categories", CB.GET_ALL);
categoriesRouter.get("/categories/:id", CB.GET);
categoriesRouter.put("/categories/:id",checkToken, upload.single("image"), CB.UPDATE);
categoriesRouter.delete("/categories/:id",checkToken, CB.DELETE);
