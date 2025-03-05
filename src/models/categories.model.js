import { Model, DataTypes } from "sequelize";

export class Category extends Model {}
export async function CATEGORY_MODEL({ sequelize }) {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name_uz: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Category name length should be between 2 and 100",
          },
        },
      },
      name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Category name length should be between 2 and 100",
          },
        },
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Category name length should be between 2 and 100",
          },
        },
      },
      description_uz: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 1000],
            msg: "Category description length should be between 2 and 300",
          },
        },
      },
      description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 1000],
            msg: "Category description length should be between 2 and 300",
          },
        },
      },
      description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 1000],
            msg: "Category description length should be between 2 and 300",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "categories",
      modelName: "categories",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
