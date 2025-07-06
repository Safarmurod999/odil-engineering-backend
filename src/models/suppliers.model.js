import { Model, DataTypes } from "sequelize";

export class Supplier extends Model {}
export async function SUPPLIERS_MODEL({ sequelize }) {
  Supplier.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 100],
            msg: "Supplier name length should be between 2 and 100",
          },
        },
      },
      partner_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
      inn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      contact_person: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [2, 100],
            msg: "Supplier email length should be between 2 and 100",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
          len: {
            args: [1, 100],
            msg: "Supplier phone length should be between 2 and 100",
          },
        },
      },
      company_description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
          len: {
            args: [1, 500],
            msg: "Supplier description length should be between 2 and 100",
          },
        },
      },
      offer: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: {
            args: [1, 1000],
            msg: "Supplier offer length should be between 2 and 100",
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
      tableName: "suppliers",
      modelName: "suppliers",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
