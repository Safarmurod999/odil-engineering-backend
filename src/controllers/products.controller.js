import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { Product } from "../models/products.model.js";
import { Image } from "../models/images.model.js";
import { Media } from "../models/media.model.js";
configDotenv();

const POST = async (req, res) => {
  try {
    const {
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      category_id,
    } = req.body;

    const image = req.files["image"] ? req.files["image"][0] : null;

    const images = req.files["images"] || [];
    if (
      !name_uz ||
      !name_ru ||
      !name_en ||
      !description_uz ||
      !description_ru ||
      !description_en ||
      !category_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = await Product.create({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      category_id,
      image: image ? `${path.join("uploads", "products", image.filename)}` : "",
      is_active: true,
    });
    const imageData = await Image.bulkCreate(
      images.map((img) => ({
        src: `${path.join("uploads", "products", img.filename)}`,
        product_id: newProduct.id,
      }))
    );
    res.status(201).json({
      status: 201,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while creating product",
      error: error.message,
    });
  }
};
const GET_ALL = async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [{ model: Image }, { model: Media }],
    });
    res.status(200).json({
      status: 200,
      data,
      message: "Data successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching products",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({
      where: { id },
      include: [{ model: Image }, { model: Media }],
    });
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      status: 200,
      data,
      message: "Data successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching product by id",
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
      description_uz,
      description_ru,
      description_en,
      category_id,
      media,
      is_active,
    } = req.body;

    const image = req.files["image"] ? req.files["image"][0] : null;
    let images = req.files["images"] || null;

    const productData = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }
    let mediaData = media;
    if (!Array.isArray(mediaData)) {
      mediaData = [mediaData];
    }
    if (!Array.isArray(images)) {
      images = [images];
    }

    const product = await Product.update(
      {
        name_uz: name_uz ?? productData.name_uz,
        name_ru: name_ru ?? productData.name_ru,
        name_en: name_en ?? productData.name_en,
        description_uz: description_uz ?? productData.description_uz,
        description_ru: description_ru ?? productData.description_ru,
        description_en: description_en ?? productData.description_en,
        image: image
          ? `${path.join("uploads", "products", image.filename)}`
          : productData.image,
        category_id: category_id ?? productData.category_id,
        is_active: is_active ?? productData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (image && productData.image) {
      fs.rm(`${path.join(process.cwd(), "src", productData.image)}`, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log("Old file deleted successfully");
      });
    }
    const imageData = await Image.bulkCreate(
      images.map((img) => ({
        src: `${path.join("uploads", "products", img.filename)}`,
        product_id: productData.id,
      }))
    );
    res.status(200).json({
      status: 200,
      data: product,
      message: "Product updated successfully!",
      err: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByPk(id);
    const images = await Image.findAll({
      where: {
        product_id: id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (data.image) {
      fs.rm(`${path.join(process.cwd(), "src", data.image)}`, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    }
    if (images) {
      images.forEach((img) => {
        fs.rm(`${path.join(process.cwd(), "src", img.src)}`, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }

    const product = await Product.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: 200,
      data: product,
      message: "Product successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  POST,
  GET_ALL,
  GET,
  UPDATE,
  DELETE,
};
