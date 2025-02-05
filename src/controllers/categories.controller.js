import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { Category } from "../models/categories.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const { name, link, description } = req.body;

    const image = req.file;

    const newProduct = await Category.create({
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
      msg: "Category created successfully",
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
    const data = await Category.findAll();
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
    const categoryData = await Category.findByPk(req.params.id);
    const category = await Category.update(
      {
        name: req.body.name ?? categoryData.name,
        link: req.body.link ?? categoryData.link,
        description: req.body.description ?? categoryData.description,
        image: image ?? categoryData.image,
        is_active: req.body.is_active ?? categoryData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({
      status: 200,
      data: category,
      msg: "Category updated successfully!",
      err: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByPk(id);

    fs.rm(data.image, (err) => {
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

    res.status(200).json({ status: 200, data: category, err: null });
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
