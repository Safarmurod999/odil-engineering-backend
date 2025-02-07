import { Model, DataTypes } from "sequelize";

export class Client extends Model {}
export async function CLIENTS_MODEL({ sequelize }) {
  Client.init(
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
            msg: "Client name length should be between 2 and 100",
          },
        },
      },
      image: {
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
      tableName: "clients",
      modelName: "clients",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
