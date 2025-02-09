import { Model, DataTypes } from "sequelize";
import { Product } from "./products.model.js";

export class Image extends Model {}
export async function IMAGES_MODEL({ sequelize }) {
  Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      src: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "images",
      modelName: "images",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
