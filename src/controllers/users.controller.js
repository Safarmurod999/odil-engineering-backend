import { User } from "../models/users.model.js";
import fs from "fs";
import { configDotenv } from "dotenv";
import { jwtHelper } from "../utils/helper.js";
import path from "path";

configDotenv();

const POST = async (req, res) => {
  try {
    const { user_name, first_name, last_name, email, password } = req.body;
    const user = await User.findOne({ where: { user_name } });

    if (user) {
      return res.status(400).json({ message: "User already signed up" });
    }
    if (!user_name || !first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const avatar = req.file;

    const newUser = await User.create({
      user_name,
      password: password,
      email: email,
      first_name,
      last_name,
      avatar: !avatar
        ? ""
        : `${path.join("uploads", "users", avatar?.filename)}`,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newUser,
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
const SIGNUP = async (req, res) => {
  try {
    const { user_name, first_name, last_name, password } = req.body;

    const user = await User.findOne({ where: { user_name } });

    if (user) {
      return res.status(400).json({ message: "User already signed up" });
    }
    if (!user_name || !first_name || !last_name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const token = jwtHelper.sign({ user_name }, process.env.SECRET_KEY);

    const newUser = await User.create({
      user_name,
      password: password,
      first_name,
      last_name,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: token,
      message: "User successfully crated.",
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
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const totalUsers = await User.count();
    const users = await User.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers,
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
    const { user_name, first_name, last_name, email, password, is_active } =
      req.body;
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
        avatar: avatar
          ? `${path.join("uploads", "users", avatar.filename)}`
          : userData.avatar,
        is_active: is_active ?? userData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json({ status: 200, data: updatedUser, message: null });
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
    const { id } = req.params;
    const data = await User.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

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
      .json({ status: 200, data: id, message: "Successfully deleted" });
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
  SIGNUP,
};
