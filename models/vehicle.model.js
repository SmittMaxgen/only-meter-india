module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define("Vehicle", {
    brand: { type: DataTypes.STRING },
    model: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    vehicleMode: { type: DataTypes.STRING, defaultValue: "Car" },
    seats: { type: DataTypes.INTEGER },
    fuelType: { type: DataTypes.STRING },
    baseFare: { type: DataTypes.FLOAT, defaultValue: 0 },
    perKmRate: { type: DataTypes.FLOAT, defaultValue: 0 },
  });
  return Vehicle;
};
