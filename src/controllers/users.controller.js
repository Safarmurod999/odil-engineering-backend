import { User } from "../models/users.model.js";
import fs from "fs";
import { configDotenv } from "dotenv";
import { jwtHelper } from "../utils/helper.js";
import path from "path";

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
    const user = await User.findOne({ where: { user_name } });

    if (user) {
      return res.status(400).json({ message: "User already signed up" });
    }
    if (
      !user_name ||
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !description_uz ||
      !description_ru ||
      !description_en
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const avatar = req.file;
    const token = jwtHelper.sign({ user_name }, process.env.SECRET_KEY);

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
        avatar == "" ? "" : `${path.join("uploads", "users", avatar.filename)}`,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: token,
      message: "Successfully signed up.",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while creating user",
      error: error.message,
    });
  }
};
const SIGNIN = async (req, res) => {
  try {
    const { user_name } = req.body;

    const token = jwtHelper.sign({ user_name }, process.env.SECRET_KEY);

    return res.json({
      status: 200,
      data: token,
      message: "Successfully signed in",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching user",
      error: error.message,
    });
  }
};
const GET_ALL = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: await User.findAll(),
      message: "Users successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching user",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findByPk(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ status: 200, data: userData, message: null });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching user by id",
      error: error.message,
    });
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
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (avatar) {
      fs.rm(`${path.join(process.cwd(), "src", userData.avatar)}`, (err) => {
        if (err) {
          throw err;
        }
        console.log("Old file deleted successfully");
      });
    }

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
          ? `${path.join("uploads", "users", avatar.filename)}`
          : userData.avatar,
        is_active: is_active ?? userData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({ status: 200, data: user, message: null });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while updating user",
      error: error.message,
    });
  }
};
const DELETE = async (req, res) => {
  try {
    console.log(req.params);
    
    const { id } = req.params;
    const data = await User.findByPk(id);    
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(process.cwd());
    
    console.log(`${path.join( "src", data.avatar)}`);
    
    fs.rm(`${path.join(process.cwd(), "src", data.avatar)}`, (err) => {
      if (err) {
        console.log("error", err);
        
        throw err;
      }
      console.log("file deleted successfully");
    });

    const user = await User.destroy({
      where: {
        id: id,
      },
    });

    res
      .status(200)
      .json({ status: 200, data: user, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while deleting user",
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
  SIGNIN,
};
