import { configDotenv } from "dotenv";
import { Media } from "../models/media.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const {
      title_uz,
      title_ru,
      title_en,
      link,
      description_uz,
      description_ru,
      description_en,
      product_id,
    } = req.body;

    const newMedia = await Media.create({
      title_uz,
      title_ru,
      title_en,
      link,
      description_uz,
      description_ru,
      description_en,
      product_id,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newMedia,
      msg: "Media created successfully",
      err: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const data = await Media.findAll();
    res.status(200).json({
      status: 200,
      data,
      msg: null,
      err: null,
    });
  } catch (error) {
    res.send(error.message);
  }
};
const UPDATE = async (req, res) => {
  try {
    const {
      title_uz,
      title_ru,
      title_en,
      link,
      description_uz,
      description_ru,
      description_en,
      product_id,
      is_active,
    } = req.body;
    const mediaData = await Media.findByPk(req.params.id);

    const category = await Media.update(
      {
        title_uz: title_uz ?? mediaData.title_uz,
        title_ru: title_ru ?? mediaData.title_ru,
        title_en: title_en ?? mediaData.title_en,
        link: link ?? mediaData.link,
        description_uz: description_uz ?? mediaData.description_uz,
        description_ru: description_ru ?? mediaData.description_ru,
        description_en: description_en ?? mediaData.description_en,
        product_id: product_id ?? mediaData.product_id,
        is_active: is_active ?? mediaData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({
      status: 200,
      data: category,
      msg: "Media updated successfully!",
      err: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ status: 200, data: media, err: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  POST,
  GET,
  UPDATE,
  DELETE,
};
