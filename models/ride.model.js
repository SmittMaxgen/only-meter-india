module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define("Ride", {
    pickup_address: DataTypes.STRING,
    pickupLat: DataTypes.STRING,
    pickupLng: DataTypes.STRING,
    drop_address: DataTypes.STRING,
    dropLat: DataTypes.STRING,
    dropLng: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: "pending" },
    otp: {
      type: DataTypes.STRING,
      defaultValue: () => Math.floor(1000 + Math.random() * 9000).toString(),
    },
    distance_km: DataTypes.FLOAT,
    duration_min: DataTypes.FLOAT,
    estimated_fare: DataTypes.FLOAT,
    paymentmode: { type: DataTypes.STRING, defaultValue: "cash" },
    ride_type: { type: DataTypes.STRING, allowNull: true },
    is_reserved: { type: DataTypes.BOOLEAN, defaultValue: false },
    scheduled_at: { type: DataTypes.DATE, allowNull: true },
  });
  return Ride;
};
