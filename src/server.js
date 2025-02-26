import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

import database from "./utils/config.js";
import { checkToken } from "./middlewares/users.middleware.js";
import { usersRouter } from "./routes/users.routes.js";
import { categoriesRouter } from "./routes/categories.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { clientsRouter } from "./routes/clients.routes.js";
import { mediaRouter } from "./routes/media.routes.js";
import { leadsRouter } from "./routes/leads.routes.js";
import { testimonialsRouter } from "./routes/testimonials.routes.js";
import { projectRouter } from "./routes/projects.routes.js";

configDotenv();

!(async function () {
  const app = express();
  await database();
  let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enable("trust proxy");
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("src/uploads"));
  app.use(usersRouter);
  app.use(checkToken, clientsRouter);
  app.use(checkToken, categoriesRouter);
  app.use(checkToken, productsRouter);
  app.use(checkToken, mediaRouter);
  app.use(checkToken, leadsRouter);
  app.use(checkToken, testimonialsRouter);
  app.use(checkToken, projectRouter);

  app.all("/*", (req, res) => {
    res.send("404 not found");
  });

  const PORT = process.env["SERVER_PORT"] || 3000;
  const HOST = process.env.SERVER_HOST || "localhost";

  app.listen(PORT, HOST, () => console.log("listening on port ", PORT));
})();
