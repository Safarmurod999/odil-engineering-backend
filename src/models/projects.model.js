import { Model, DataTypes } from "sequelize";

export class Project extends Model {}
export async function PROJECTS_MODEL({ sequelize }) {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title_uz: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Media name length should be between 2 and 100",
          },
        },
      },
      title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Project name length should be between 2 and 100",
          },
        },
      },
      title_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Project name length should be between 2 and 100",
          },
        },
      },
      description_uz: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: "Project description length should be between 2 and 300",
          },
        },
      },
      description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: "Project description length should be between 2 and 300",
          },
        },
      },
      description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: "Project description length should be between 2 and 300",
          },
        },
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
      tableName: "project",
      modelName: "project",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
