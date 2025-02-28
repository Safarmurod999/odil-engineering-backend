import { Router } from "express";
import CB from "../controllers/testimonials.controller.js";
import { checkToken } from "../middlewares/users.middleware.js";

export const testimonialsRouter = Router();

testimonialsRouter.post("/testimonials",checkToken, CB.POST);
testimonialsRouter.get("/testimonials", CB.GET_ALL);
testimonialsRouter.get("/testimonials/:id", CB.GET);
testimonialsRouter.put("/testimonials/:id",checkToken, CB.UPDATE);
testimonialsRouter.delete("/testimonials/:id",checkToken, CB.DELETE);
