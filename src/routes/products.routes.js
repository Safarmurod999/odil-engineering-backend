import { Router } from "express";

import CB from "../controllers/products.controller.js";
import { upload } from "../libs/multer.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const productsRouter = Router();

productsRouter.post(
  "/products",
  checkToken,
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
  checkToken,
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
productsRouter.delete("/products/:id", checkToken, CB.DELETE);
