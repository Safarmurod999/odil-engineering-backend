import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { Product } from "../models/products.model.js";

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
      media,
    } = req.body;

    const image = req.files["image"] ? req.files["image"][0] : null;

    const images = req.files["images"] || [];

    const newProduct = await Product.create({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      category_id,
      media,
      image: image ? `${path.join("uploads", "products", image.filename)}` : "",
      images: images.map(
        (img) => `${path.join("uploads", "products", img.filename)}`
      ),

      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newProduct,
      msg: "Product created successfully",
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
    const data = await Product.findAll();
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

    const productData = await Product.findByPk(req.params.id);

    let mediaData = media;
    if (!Array.isArray(mediaData)) {
      mediaData = [mediaData];
    }
    if (!Array.isArray(images)) {
      images = [images];
    }
    const imgPaths = images.map(
      (img) => `${path.join("uploads", "products", img.filename)}`
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
    if (images.length && productData.images) {
      productData.images.forEach((img) => {
        fs.rm(`${path.join(process.cwd(),"src", img)}`, (err) => {
          if (err) {
            throw err;
          }
          console.log("Old file deleted successfully");
        });
      });
    }
    const product = await Product.update(
      {
        name_uz: name_uz ?? productData.name_uz,
        name_ru: name_ru ?? productData.name_ru,
        name_en: name_en ?? productData.name_en,
        description_uz: description_uz ?? productData.description_uz,
        description_ru: description_ru ?? productData.description_ru,
        description_en: description_en ?? productData.description_en,
        category_id: category_id ?? productData.category_id,
        media: mediaData && mediaData.length ? mediaData : productData.media,
        image: image
          ? `${path.join( "uploads", "products", image.filename)}`
          : productData.image,
        images: images && images.length ? imgPaths : productData.images,
        is_active: is_active ?? productData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({
      status: 200,
      data: product,
      msg: "Product updated successfully!",
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

    if (data.image) {
      fs.rm(`${path.join(process.cwd(),"src", data.image)}`, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log("Old file deleted successfully");
      });
    }
    if (data.images) {
      data.images.forEach((img) => {
        fs.rm(`${path.join(process.cwd(),"src", img)}`, (err) => {
          if (err) {
            throw err;
          }
          console.log("Old file deleted successfully");
        });
      });
    }

    const product = await Product.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ status: 200, data: product, err: null });
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
