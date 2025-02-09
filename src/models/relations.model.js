import { Category } from "./categories.model.js";
import { Image } from "./images.model.js";
import { Media } from "./media.model.js";
import { Product } from "./products.model.js";

export async function RELATIONS_MODEL() {
  try {
    Product.hasMany(Image, { foreignKey: "product_id", onDelete: "CASCADE" });
    Image.belongsTo(Product, { foreignKey: "product_id" });
    
    Category.hasMany(Product, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });
    Product.belongsTo(Category, { foreignKey: "category_id" });

    Product.hasMany(Media, { foreignKey: "product_id", onDelete: "CASCADE" });
    Media.belongsTo(Product, { foreignKey: "product_id" });
  } catch (error) {
    console.log("Error while creating relations", error.message);
  }
}
