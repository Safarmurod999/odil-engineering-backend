import { Model, DataTypes } from "sequelize";

export class Product extends Model {}
export async function PRODUCT_MODEL({ sequelize }) {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Product name length should be between 2 and 100",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: "Product description length should be between 2 and 300",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      media:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "products",
      modelName: "products",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
