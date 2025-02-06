import { User } from "../models/users.model.js";
import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { jwtHelper } from "../utils/helper.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const {
      user_name,
      first_name,
      last_name,
      email,
      description_uz,
      description_ru,
      description_en,
      password,
    } = req.body;

    const avatar = req.file;
    const token = jwtHelper.sign({ user_name }, "Safarmurod");

    const newUser = await User.create({
      user_name,
      password: password,
      email: email,
      first_name,
      last_name,
      description_uz,
      description_ru,
      description_en,
      avatar:
        avatar == ""
          ? ""
          : `${path.join("src", "uploads", "users", avatar.filename)}`,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: token,
      msg: "Successfully signed up.",
      err: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
const SIGNIN = async (req, res) => {
  try {
    const { user_name } = req.body;

    const token = jwtHelper.sign({ user_name }, process.env.SECRET_KEY);

    return res.json({ status: 200, data: token, error: null });
  } catch (error) {
    console.log(error.message);
  }
};
const GET = async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: 200, data: await User.findAll(), err: null });
  } catch (error) {
    res.send(error.message);
  }
};
const UPDATE = async (req, res) => {
  try {
    const {
      user_name,
      first_name,
      last_name,
      email,
      description_uz,
      description_ru,
      description_en,
      password,
      is_active,
    } = req.body;
    const avatar = req.file;
    const userData = await User.findByPk(req.params.id);
    if (avatar) {
      console.log(`${path.join(process.cwd(),userData.avatar)}`);      
      fs.rm(`${path.join(process.cwd(), userData.avatar)}`, (err) => {
        if (err) {
          throw err;
        }
        console.log("Old file deleted successfully");
      });
    }
    console.log(req.body);

    const user = await User.update(
      {
        user_name: user_name ?? userData.user_name,
        password: password ?? userData.password,
        email: email ?? userData.email,
        first_name: first_name ?? userData.first_name,
        last_name: last_name ?? userData.last_name,
        description_uz: description_uz ?? userData.description_uz,
        description_ru: description_ru ?? userData.description_ru,
        description_en: description_en ?? userData.description_en,
        avatar: avatar
          ? `${path.join("src", "uploads", "users", avatar.filename)}`
          : userData.avatar,
        is_active: is_active ?? userData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({ status: 200, data: user, err: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);

    fs.rm(`${path.join(process.cwd(), data.image)}`, (err) => {
      if (err) {
        throw err;
      }
      console.log("file deleted successfully");
    });

    const user = await User.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ status: 200, data: user, err: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  POST,
  GET,
  UPDATE,
  DELETE,
  SIGNIN,
};
