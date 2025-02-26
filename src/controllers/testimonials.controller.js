import { Testimonial } from "../models/testimonials.model.js";

const POST = async (req, res) => {
  try {
    const { name_uz, name_en, name_ru, message_uz, message_en, message_ru } =
      req.body;
    if (
      !name_uz ||
      !name_en ||
      !name_ru ||
      !message_uz ||
      !message_en ||
      !message_ru
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTestimonial = await Testimonial.create({
      name_uz,
      name_en,
      name_ru,
      message_uz,
      message_en,
      message_ru,
      is_active: true,
    });

    return res.status(201).json({
      status: 201,
      data: newTestimonial,
      message: "Testimonial created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while creating testimonial",
      error: error.message,
    });
  }
};

const GET_ALL = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const totalTestimonials = await Testimonial.count();
    const testimonials = await Testimonial.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: testimonials,
      totalPages: Math.ceil(totalTestimonials / limit),
      currentPage: page,
      totalTestimonials,
      message: "Testimonials successfully fetched",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching testimonials",
      error: error.message,
    });
  }
};

const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name_uz,
      name_en,
      name_ru,
      message_uz,
      message_en,
      message_ru,
      is_active,
    } = req.body;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    const data = await testimonial.update({
      name_en,
      name_ru,
      name_uz,
      message_uz,
      message_en,
      message_ru,
      is_active,
    });
    const updatedTestimonial = await Testimonial.findByPk(id);
    return res.status(200).json({
      status: 200,
      data: updatedTestimonial,
      message: "Testimonial updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while updating testimonial",
      error: error.message,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    const data = await Testimonial.destroy({
      where: {
        id: id,
      },
    });

    res
      .status(200)
      .json({ status: 200, data: id, message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting testimonial",
      error: error.message,
    });
  }
};

export default { POST, GET_ALL, UPDATE, DELETE };
