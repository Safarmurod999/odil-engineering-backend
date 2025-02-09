import { Model, DataTypes } from "sequelize";

export class Media extends Model {}
export async function MEDIA_MODEL({ sequelize }) {
  Media.init(
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
            msg: "Media name length should be between 2 and 100",
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
            msg: "Media name length should be between 2 and 100",
          },
        },
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "media",
      modelName: "media",
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      underscored: true,
      sequelize,
    }
  );
}
