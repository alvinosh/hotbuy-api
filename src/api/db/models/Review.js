module.exports = (sequelize, DataTypes) => {
  sequelize.define("Review", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "sa kot"
    },
    score: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};
