import { jwtHelper } from "../utils/helper.js";
import { User } from "../models/users.model.js";

export const checkUser = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;

    const user = await User.findOne({
      where: {
        user_name: user_name,
      },
    });

    if (!user) {
      res.status(404).json({ status: 404, error: "Invalid Credentials" });
      return;
    }

    const passwordCompare = user.password === password;

    if (!passwordCompare) {
      res.status(401).json({ status: 401, error: "Invalid Credentials" });
      return;
    }
    return next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while checking user credentials",
      error: error.message,
    });
  }
};

export const checkToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization;
    // console.log(token);

    const verifiedToken = jwtHelper.verify(token, process.env.SECRET_KEY);

    if (typeof verifiedToken === "string") {
      res.status(401).json({
        status: 401,
        data: null,
        msg: "Invalid credentials",
      });
      return;
    }

    req.user_name = verifiedToken.user_name;

    return next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while checking user token",
      error: error.message,
    });
  }
};
