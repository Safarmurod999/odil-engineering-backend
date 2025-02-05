import { Router } from "express";

import CB from "../controllers/categories.controller.js";
import { upload } from "../libs/multer.js";

export const categoriesRouter = Router();

categoriesRouter.post("/categories", upload.single("image"), CB.POST);
categoriesRouter.get("/categories", CB.GET);
categoriesRouter.put("/categories/:id", upload.single("image"), CB.UPDATE);
categoriesRouter.delete("/categories/:id", CB.DELETE);
