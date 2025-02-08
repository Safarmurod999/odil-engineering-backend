import { Op } from "sequelize";
import { Testimonial } from "../models/testimonials.model.js";

// Create a new testimonial
const POST = async (req, res) => {
  try {
    const { name, job, message_uz, message_en, message_ru, is_active } =
      req.body;

    if (!name || !job || !message_uz || !message_en || !message_ru) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTestimonial = await Testimonial.create({
      name,
      job,
      message_uz,
      message_en,
      message_ru,
      is_active,
    });

    return res.status(201).json({
      message: "Testimonial created successfully",
      testimonial: newTestimonial,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating testimonial", error: error.message });
  }
};

// Get all testimonials
const GET_ALL = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    return res.status(200).json(testimonials);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching testimonials", error: error.message });
  }
};

// Get a single testimonial by ID
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.status(200).json(testimonial);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching testimonial", error: error.message });
  }
};

// Update a testimonial
const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      message_uz,
      message_en,
      message_ru,
      is_active,
    } = req.body;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    await testimonial.update({
      name,
      email,
      phone,
      message_uz,
      message_en,
      message_ru,
      is_active,
    });
    return res
      .status(200)
      .json({ message: "Testimonial updated successfully", testimonial });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating testimonial", error: error.message });
  }
};

// Delete a testimonial
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    await testimonial.destroy();
    return res
      .status(200)
      .json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting testimonial", error: error.message });
  }
};

export default { POST, GET_ALL, GET, UPDATE, DELETE };
