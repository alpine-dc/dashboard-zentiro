module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.TEXT,
    },
    token: {
      type: DataTypes.TEXT,
    },
    loginAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return user;
};
