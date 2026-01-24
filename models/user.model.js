module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    full_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    mobile_no: { type: DataTypes.STRING },
  });
  return User;
};
