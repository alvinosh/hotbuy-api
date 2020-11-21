module.exports = (sequelize, DataTypes) => {
  sequelize.define("Post", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "titull"
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      defaultValue: "permbajtja"
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1000
    },
    pictures: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "kot"
    }
  });
};
