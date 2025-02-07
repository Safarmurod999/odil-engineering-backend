import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { Client } from "../models/clients.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const {
      name,
    } = req.body;

    const image = req.file;

    const newProduct = await Client.create({
      name,
      image:
        image == ""
          ? ""
          : `${path.join("src", "uploads", "clients", image.filename)}`,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newProduct,
      msg: "Client created successfully",
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
    const data = await Client.findAll();
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
      name,
      is_active,
    } = req.body;
    const image = req.file;
    const clientData = await Client.findByPk(req.params.id);
    if (image) {
      fs.rm(`${path.join(process.cwd(), clientData.image)}`, (err) => {
        if (err) {
          throw err;
        }
        console.log("Old file deleted successfully");
      });
    }
    
    const client = await Client.update(
      {
        name: name ?? clientData.name,
        image: image
          ? `${path.join("src", "uploads", "clients", image.filename)}`
          : clientData.image,
        is_active: is_active ?? clientData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({
      status: 200,
      data: client,
      msg: "Client updated successfully!",
      err: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Client.findByPk(id);

    fs.rm(`${path.join(process.cwd(), data.image)}`, (err) => {
      if (err) {
        throw err;
      }
      console.log("Image deleted successfully");
    });

    const client = await Client.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ status: 200, data: client, err: null });
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
