import { Sequelize } from "sequelize";
import { USER_MODEL } from "../models/users.model.js";
import { CATEGORY_MODEL } from "../models/categories.model.js";
import { PRODUCT_MODEL } from "../models/products.model.js";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "odil_engineering",
  username: "postgres",
  password: "123",
  host: "localhost",
  port: 5432,
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     ca: readFileSync(path.join(process.cwd(), "src", "ca.pem")).toString(),
  //   },
  // },
});

export default async function () {
  try {
    sequelize.authenticate();
    console.log("db connected...");
    // load models
    USER_MODEL({ sequelize });
    CATEGORY_MODEL({ sequelize });
    PRODUCT_MODEL({ sequelize });
    console.log("models are loaded!");

    //sync models
    await sequelize.sync({ alter: true });
    console.log("models are syncronized!");

    return sequelize;
  } catch (error) {
    console.log(error);
    console.log("db did not connect!");
  }
}
