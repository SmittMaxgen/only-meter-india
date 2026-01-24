const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const db = require("./models");
const { initSocket } = require("./socket");

const app = express();
app.use(cors());
app.use(express.json());

// Demo page
app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "demo.html"));
});

const server = http.createServer(app);
initSocket(server, db);

// Sync DB and start server
// Sync DB without dropping data
db.sequelize.sync({ alter: true }).then(async () => {
  console.log("Database synced without deleting data");

  // Create dummy users only if none exist
  const userCount = await db.User.count();
  if (userCount === 0) {
    await db.User.bulkCreate([
      { full_name: "Ronny", email: "ronny@gmail.com", mobile_no: "7069456055" },
      { full_name: "Alice", email: "alice@gmail.com", mobile_no: "9876543210" },
    ]);
    console.log("Dummy users created");
  }

  // Create dummy drivers only if none exist
  const driverCount = await db.Driver.count();
  if (driverCount === 0) {
    await db.Driver.bulkCreate([
      { name: "Driver One", email: "driver1@gmail.com", phone: "8887779998" },
      { name: "Driver Two", email: "driver2@gmail.com", phone: "9998887776" },
    ]);
    console.log("Dummy drivers created");
  }

  // Create dummy vehicles only if none exist
  const vehicleCount = await db.Vehicle.count();
  if (vehicleCount === 0) {
    await db.Vehicle.bulkCreate([
      {
        brand: "Toyota",
        model: "Innova",
        type: "SUV",
        seats: 7,
        fuelType: "Diesel",
      },
      {
        brand: "Honda",
        model: "City",
        type: "Sedan",
        seats: 4,
        fuelType: "Petrol",
      },
    ]);
    console.log("Dummy vehicles created");
  }

  server.listen(5000, () => console.log("Server running on port 5000"));
});
