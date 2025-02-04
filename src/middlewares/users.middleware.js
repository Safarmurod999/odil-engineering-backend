import { User } from "../models/users.model.js";

export async function checkUser(req, res, next) {
  try {
    const { user_name, password } = req.body;

    const user = await User.findOne({
      where: {
        user_name: user_name,
      },
    });

    if (!user) {
      res.json({ status: 404, error: "Invalid Credentials" });
      return;
    }

    const passwwordCompare = user.password === password;

    if (!passwwordCompare) {
      res.json({ status: 401, error: "Invalid Credentials" });
      return;
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
}
