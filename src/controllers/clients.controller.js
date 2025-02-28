import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { Client } from "../models/clients.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const { name } = req.body;

    const image = req.file;

    const newClient = await Client.create({
      name,
      image:
        image == ""
          ? ""
          : `${path.join("src", "uploads", "clients", image?.filename)}`,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newClient,
      msg: "Client created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while creating client",
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

    const totalClients = await Client.count();
    const clients = await Client.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: clients,
      totalPages: Math.ceil(totalClients / limit),
      currentPage: page,
      totalClients,
      message: "Clients successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching clients",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Client.findByPk(id);
    if (!data) {
      res.status(404).json({
        message: "Client not found!",
      });
    }
    res.status(200).json({
      status: 200,
      data,
      message: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching client",
      error: error.message,
    });
  }
};
const UPDATE = async (req, res) => {
  try {
    const { name, is_active } = req.body;
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
    const updatedClient = await Client.findByPk(req.params.id);
    res.status(200).json({
      status: 200,
      data: updatedClient,
      msg: "Client updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while updating client",
      error: error.message,
    });
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

    res.status(200).json({
      status: 200,
      data: id,
      message: "Client successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while deleting client",
      error: error.message,
    });
  }
};

export default {
  POST,
  GET_ALL,
  UPDATE,
  DELETE,
};
