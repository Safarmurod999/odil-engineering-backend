import { configDotenv } from "dotenv";
import { Media } from "../models/media.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const { title_uz, title_ru, title_en, link, product_id } = req.body;
    if (!title_uz || !title_ru || !title_en || !link || !product_id) {
      res.status(400).json({
        message: "All fields are required!",
      });
    }
    const newMedia = await Media.create({
      title_uz,
      title_ru,
      title_en,
      link,
      product_id,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newMedia,
      message: "Media created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while creating media",
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

    const totalMedia = await Media.count();
    const media = await Media.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: media,
      totalPages: Math.ceil(totalMedia / limit),
      currentPage: page,
      totalMedia,
      message: "Media successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching medias",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Media.findByPk(id);
    if (!data) {
      res.status(404).json({
        message: "Media not found!",
      });
    }
    res.status(200).json({
      status: 200,
      data,
      message: "Media successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching media by id",
      error: error.message,
    });
  }
};
const UPDATE = async (req, res) => {
  try {
    const { title_uz, title_ru, title_en, link, product_id, is_active } =
      req.body;
    const data = await Media.findByPk(req.params.id);
    if (!data) {
      res.status(404).json({
        message: "Media not found!",
      });
    }
    const media = await Media.update(
      {
        title_uz: title_uz ?? data.title_uz,
        title_ru: title_ru ?? data.title_ru,
        title_en: title_en ?? data.title_en,
        link: link ?? data.link,
        product_id: product_id ?? data.product_id,
        is_active: is_active ?? data.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );
    const updatedMedia = await Media.findByPk(req.params.id);
    res.status(200).json({
      status: 200,
      data: updatedMedia,
      message: "Media updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while updating media",
      error: error.message,
    });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Media.findByPk(id);
    if (!data) {
      res.status(404).json({
        message: "Media not found!",
      });
    }
    const media = await Media.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: 200,
      data: req.params.id,
      message: "Media successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while deleting media",
      error: error.message,
    });
  }
};

export default {
  POST,
  GET_ALL,
  GET,
  UPDATE,
  DELETE,
};
