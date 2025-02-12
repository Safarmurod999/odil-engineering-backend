import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
import { USER_MODEL } from "../models/users.model.js";
import { CATEGORY_MODEL } from "../models/categories.model.js";
import { IMAGES_MODEL } from "../models/images.model.js";
import { PRODUCT_MODEL } from "../models/products.model.js";
import { MEDIA_MODEL } from "../models/media.model.js";
import { CLIENTS_MODEL } from "../models/clients.model.js";
import { LEADS_MODEL } from "../models/leads.model.js";
import { TESTIMONIALS_MODEL } from "../models/testimonials.model.js";
import { PROJECTS_MODEL } from "../models/projects.model.js";
import { RELATIONS_MODEL } from "../models/relations.model.js";

configDotenv();

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
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
    sequelize.authenticate().then(() => console.log("db connected..."));
    // load models
    USER_MODEL({ sequelize });
    CATEGORY_MODEL({ sequelize });
    IMAGES_MODEL({ sequelize });
    PRODUCT_MODEL({ sequelize });
    CLIENTS_MODEL({ sequelize });
    MEDIA_MODEL({ sequelize });
    PROJECTS_MODEL({ sequelize });
    LEADS_MODEL({ sequelize });
    TESTIMONIALS_MODEL({ sequelize });
    RELATIONS_MODEL();
    console.log("models are loaded!");

    //sync models
    await sequelize
      .sync({ alter: true })
      .then(() => console.log("models are syncronized!"));

    return sequelize;
  } catch (error) {
    console.log("db did not connect!", {
      status: 500,
      message: "Error while connecting to db",
      error: error.message,
    });
  }
}
