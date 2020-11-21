module.exports = (sequelize, DataTypes) => {
  sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "123456789"
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "alvi"
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "hysa"
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "1234567"
    }
  });
};
