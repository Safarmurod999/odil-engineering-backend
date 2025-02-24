import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { Category } from "../models/categories.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const {
      name_uz,
      name_ru,
      name_en,
      link,
      description_uz,
      description_ru,
      description_en,
    } = req.body;

    const image = req.file;

    const newCategory = await Category.create({
      name_uz,
      name_ru,
      name_en,
      link,
      description_uz,
      description_ru,
      description_en,
      image:
        image == ""
          ? ""
          : `${path.join("uploads", "categories", image.filename)}`,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newCategory,
      msg: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching category",
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

    const totalCategories = await Category.count();
    const categories = await Category.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: categories,
      totalPages: Math.ceil(totalCategories / limit),
      currentPage: page,
      totalCategories,
      message: "Categories successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching category",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      status: 200,
      data,
      message: "Category fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching category",
      error: error.message,
    });
  }
};
const UPDATE = async (req, res) => {
  try {
    const {
      name_uz,
      name_ru,
      name_en,
      link,
      description_uz,
      description_ru,
      description_en,
      is_active,
    } = req.body;
    const image = req.file;
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (image) {
      fs.rm(`${path.join(process.cwd(), "src", categoryData.image)}`, (err) => {
        if (err) {
          throw err;
        }
        console.log("Old file deleted successfully");
      });
    }

    const category = await Category.update(
      {
        name_uz: name_uz ?? categoryData.name_uz,
        name_ru: name_ru ?? categoryData.name_ru,
        name_en: name_en ?? categoryData.name_en,
        link: link ?? categoryData.link,
        description_uz: description_uz ?? categoryData.description_uz,
        description_ru: description_ru ?? categoryData.description_ru,
        description_en: description_en ?? categoryData.description_en,
        image: image
          ? `${path.join("uploads", "categories", image.filename)}`
          : categoryData.image,
        is_active: is_active ?? categoryData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );
    const updatedCategory = await Category.findByPk(req.params.id);

    res.status(200).json({
      status: 200,
      data: updatedCategory,
      msg: "Category updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching category",
      error: error.message,
    });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    fs.rm(`${path.join(process.cwd(), "src", data.image)}`, (err) => {
      if (err) {
        throw err;
      }
      console.log("file deleted successfully");
    });

    const category = await Category.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: 200,
      data: id,
      message: "Category successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching category",
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
