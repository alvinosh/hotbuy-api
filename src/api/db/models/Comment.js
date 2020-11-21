module.exports = (sequelize, DataTypes) => {
  sequelize.define("Comment", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "ky esht nje komment"
    },
    score: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};
