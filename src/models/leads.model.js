import { Model, DataTypes } from "sequelize";

export class Lead extends Model {}
export async function LEADS_MODEL({ sequelize }) {
  Lead.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 100],
            msg: "Lead name length should be between 2 and 100",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 100],
            msg: "Lead email length should be between 2 and 100",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 100],
            msg: "Lead phone length should be between 2 and 100",
          },
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 100],
            msg: "Lead message length should be between 2 and 100",
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
      tableName: "leads",
      modelName: "leads",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
