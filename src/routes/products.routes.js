import { Router } from "express";

import CB from "../controllers/products.controller.js";
import { upload } from "../libs/multer.js";

export const productsRouter = Router();

productsRouter.post(
  "/products",
  upload.single("image"),
  upload.array("images"),
  CB.POST
);
productsRouter.get("/products", CB.GET);
productsRouter.put(
  "/products/:id",
  upload.single("image"),
  upload.array("images"),
  CB.UPDATE
);
productsRouter.delete("/products/:id", CB.DELETE);
