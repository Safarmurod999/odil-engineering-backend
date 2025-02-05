import { User } from "../models/users.model.js";
import path from "node:path";
import fs from "node:fs";
import { configDotenv } from "dotenv";
import { jwtHelper } from "../utils/helper.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const { user_name, first_name, last_name, email, description, password } =
      req.body;

    const avatar = req.file;
    console.log(avatar);
    
    // const encryptedPassword = bcryptHelper.hash(password, salt);

    const token = jwtHelper.sign({ user_name }, "Safarmurod");

    const newUser = await User.create({
      user_name,
      password: password,
      email: email,
      first_name,
      last_name,
      description,
      avatar:
        avatar == ""
          ? ""
          : `${path.join(
              process.cwd(),
              "src",
              "uploads",
              avatar.filename
            )}`,
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
    const avatar = req.file;
    const userData = await User.findByPk(req.params.id);
    const user = await User.update(
      {
        user_name: req.body.user_name ?? userData.user_name,
        password: req.body.password ?? userData.password,
        email: req.body.email ?? userData.email,
        first_name: req.body.first_name ?? userData.first_name,
        last_name: req.body.last_name ?? userData.last_name,
        description: req.body.description ?? userData.description,
        avatar: avatar ?? userData.avatar,
        is_active: req.body.is_active ?? userData.is_active,
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
    console.log(id);
    console.log(data);
    
    fs.rm(data.avatar, (err) => {
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
