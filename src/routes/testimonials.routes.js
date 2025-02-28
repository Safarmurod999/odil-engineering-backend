import { Router } from "express";
import CB from "../controllers/testimonials.controller.js";

export const testimonialsRouter = Router();

testimonialsRouter.post("/testimonials", CB.POST);
testimonialsRouter.get("/testimonials", CB.GET_ALL);
// testimonialsRouter.get("/testimonials/:id", CB.GET);
testimonialsRouter.put("/testimonials/:id", CB.UPDATE);
testimonialsRouter.delete("/testimonials/:id", CB.DELETE);
