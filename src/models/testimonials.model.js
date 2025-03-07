import { Model, DataTypes } from "sequelize";

export class Testimonial extends Model {}
export async function TESTIMONIALS_MODEL({ sequelize }) {
  Testimonial.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name_uz: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 400],
            msg: "Testimonial name length should be between 2 and 100",
          },
        },
      },
      name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 400],
            msg: "Testimonial name length should be between 2 and 100",
          },
        },
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 400],
            msg: "Testimonial name length should be between 2 and 100",
          },
        },
      },
      message_uz: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 400],
            msg: "Testimonial message length should be between 2 and 100",
          },
        },
      },
      message_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 400],
            msg: "Testimonial message length should be between 2 and 100",
          },
        },
      },
      message_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 400],
            msg: "Testimonial message length should be between 2 and 100",
          },
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "testimonials",
      modelName: "testimonials",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
