import { Model, DataTypes } from "sequelize";

export class User extends Model {}
export async function USER_MODEL({ sequelize }) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: "username length should be between 2 and 50",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: "password length should be between 2 and 50",
          },
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      description_uz: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
      },
      description_en: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
      },
      description_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "users",
      modelName: "user",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
