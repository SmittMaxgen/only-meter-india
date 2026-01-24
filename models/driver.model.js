module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define("Driver", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "offline" },
    verification: { type: DataTypes.STRING, defaultValue: "approved" },
    lat: { type: DataTypes.STRING, defaultValue: "0" },
    lng: { type: DataTypes.STRING, defaultValue: "0" },
    license_no: { type: DataTypes.STRING, allowNull: true },
    license_doc: { type: DataTypes.STRING, allowNull: true },
    license_expiry: { type: DataTypes.DATE, allowNull: true },
  });
  return Driver;
};
