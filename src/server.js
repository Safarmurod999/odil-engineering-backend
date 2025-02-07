import express from "express";
import { configDotenv } from "dotenv";

import database from "./utils/config.js";
import { authRouter } from "./routes/auth.routes.js";
import { categoriesRouter } from "./routes/categories.routes.js";
import { checkToken } from "./middlewares/users.middleware.js";
import { productsRouter } from "./routes/products.routes.js";
import { clientsRouter } from "./routes/clients.routes.js";
import { mediaRouter } from "./routes/media.routes.js";

configDotenv();

!(async function () {
  const app = express();
  await database();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("src/uploads"));
  app.use(authRouter);
  app.use(checkToken, clientsRouter);
  app.use(checkToken, categoriesRouter);
  app.use(checkToken, productsRouter);
  app.use(checkToken, mediaRouter);

  app.all("/*", (req, res) => {
    res.send("404 not found");
  });

  const PORT = process.env["SERVER_PORT"] || 3000;
  const HOST = process.env.SERVER_HOST || "localhost";

  app.listen(PORT, HOST, () => console.log("listening on port ", PORT));
})();
