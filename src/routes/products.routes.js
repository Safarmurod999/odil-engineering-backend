import { Router } from "express";

import CB from "../controllers/products.controller.js";
import { upload } from "../libs/multer.js";

export const productsRouter = Router();

productsRouter.post(
  "/products",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 8,
    },
  ]),
  CB.POST
);
productsRouter.get("/products", CB.GET_ALL);
productsRouter.get("/products/:id", CB.GET);
productsRouter.put(
  "/products/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 8,
    },
  ]),
  CB.UPDATE
);
productsRouter.delete("/products/:id", CB.DELETE);
