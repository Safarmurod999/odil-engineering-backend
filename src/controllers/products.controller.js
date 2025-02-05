import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { Product } from "../models/products.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const { name, link, description } = req.body;

    const image = req.file;

    const newProduct = await Product.create({
      name,
      link,
      description,
      image:
        image == ""
          ? ""
          : `${path.join(
              process.cwd(),
              "src",
              "uploads",
              image.filename
            )}`,
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
    const image = req.file;
    const productData = await Product.findByPk(req.params.id);
    const product = await Product.update(
      {
        name: req.body.name ?? productData.name,
        link: req.body.link ?? productData.link,
        description: req.body.description ?? productData.description,
        image: image ?? productData.image,
        is_active: req.body.is_active ?? productData.is_active,
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

    fs.rm(data.image, (err) => {
      if (err) {
        throw err;
      }
      console.log("file deleted successfully");
    });

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
