import express from "express";
import { configDotenv } from "dotenv";

import database from "./utils/config.js";
import { authRouter } from "./routes/auth.routes.js";
import { categoriesRouter } from "./routes/categories.routes.js";
import { checkToken } from "./middlewares/users.middleware.js";

configDotenv();

!(async function () {
  const app = express();
  await database();
  app.use(express.json());
  app.use(authRouter);
  app.use(checkToken, categoriesRouter);
  
  app.all("/*", (req, res) => {
    res.send("404 not found");
  });

  const PORT = process.env["SERVER_PORT"] || 3000;
  const HOST = process.env.SERVER_HOST || "localhost";

  app.listen(PORT, HOST, () => console.log("listening on port ", PORT));
})();
