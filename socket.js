// const { Server } = require("socket.io");

// function initSocket(server, db) {
//   const io = new Server(server, { cors: { origin: "*" } });

//   io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);

//     // CREATE
//     socket.on("createRide", async (data) => {
//       const ride = await db.Ride.create(data);
//       const fullRide = await db.Ride.findByPk(ride.id, {
//         include: [db.User, db.Driver, db.Vehicle],
//       });
//       io.emit("rideCreated", formatRide(fullRide));
//     });

//     // READ all
//     socket.on("readRides", async () => {
//       const rides = await db.Ride.findAll({
//         include: [db.User, db.Driver, db.Vehicle],
//       });
//       io.emit("ridesList", rides.map(formatRide));
//     });

//     // GET by ID
//     socket.on("getRide", async (id) => {
//       const ride = await db.Ride.findByPk(id, {
//         include: [db.User, db.Driver, db.Vehicle],
//       });
//       if (ride)
//         socket.emit("rideData", {
//           status: "success",
//           data: [formatRide(ride)],
//         });
//       else
//         socket.emit("rideData", { status: "error", message: "Ride not found" });
//     });

//     // UPDATE
//     socket.on("updateRide", async ({ id, data }) => {
//       const ride = await db.Ride.findByPk(id);
//       if (!ride)
//         return socket.emit("rideUpdated", {
//           status: "error",
//           message: "Ride not found",
//         });
//       await ride.update(data);
//       const updated = await db.Ride.findByPk(id, {
//         include: [db.User, db.Driver, db.Vehicle],
//       });
//       io.emit("rideUpdated", formatRide(updated));
//     });

//     // DELETE
//     socket.on("deleteRide", async (id) => {
//       await db.Ride.destroy({ where: { id } });
//       io.emit("rideDeleted", id);
//     });
//   });
// }

// // Format ride to match your JSON structure
// function formatRide(ride) {
//   return {
//     id: ride.id,
//     user_data: ride.User,
//     driver_data: ride.Driver,
//     vehicle_type_data: ride.Vehicle,
//     vehicle_type: null,
//     pickup_address: ride.pickup_address,
//     pickupLat: ride.pickupLat,
//     pickupLng: ride.pickupLng,
//     drop_address: ride.drop_address,
//     dropLat: ride.dropLat,
//     dropLng: ride.dropLng,
//     status: ride.status,
//     otp: ride.otp,
//     distance_km: ride.distance_km,
//     duration_min: ride.duration_min,
//     estimated_fare: ride.estimated_fare,
//     paymentmode: ride.paymentmode,
//     ride_type: ride.ride_type,
//     is_reserved: ride.is_reserved,
//     scheduled_at: ride.scheduled_at,
//     created_at: ride.createdAt,
//   };
// }

// module.exports = { initSocket };
const { Server } = require("socket.io");
const axios = require("axios");

const API_BASE = "https://onlymeterindia.info"; // change if needed

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    /* ================= USER ================= */

    socket.on("getUser", async ({ user_id, email, mobile_no }) => {
      try {
        let url = "";
        if (user_id) url = `${API_BASE}/user/${user_id}/`;
        else if (email) url = `${API_BASE}/user/email/${email}/`;
        else if (mobile_no) url = `${API_BASE}/user/mobile_no/${mobile_no}/`;

        const { data } = await axios.get(url);
        console.log("data:::", data);
        socket.emit("userData", data.data ?? data);
      } catch (err) {
        socket.emit("socketError", "User not found");
      }
    });

    /* ================= DRIVER ================= */

    socket.on("getDriver", async ({ id, email, phone }) => {
      try {
        let url = "";
        if (id) url = `${API_BASE}/driver/${id}/`;
        else if (email) url = `${API_BASE}/driver/email/${email}/`;
        else if (phone) url = `${API_BASE}/driver/phone/${phone}/`;

        const { data } = await axios.get(url);
        socket.emit("driverData", data.data ?? data);
      } catch {
        socket.emit("socketError", "Driver not found");
      }
    });

    /* ================= VEHICLE ================= */

    socket.on("getVehicle", async ({ vehicle_type_id, driver_id }) => {
      try {
        let url = "";
        if (vehicle_type_id) url = `${API_BASE}/vehicle/${vehicle_type_id}/`;
        else if (driver_id)
          url = `${API_BASE}/driver_vehicle/driver/${driver_id}/`;

        const { data } = await axios.get(url);

        // driver_vehicle usually returns array
        socket.emit(
          "vehicleData",
          Array.isArray(data.data) ? data.data[0] : (data.data ?? data),
        );
      } catch {
        socket.emit("socketError", "Vehicle not found");
      }
    });

    /* ================= CREATE RIDE ================= */

    socket.on("createRideRequest", async (payload) => {
      try {
        const { data } = await axios.post(
          `${API_BASE}/ride_request/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("API data:", data);
        io.emit("rideCreated", data);
      } catch (err) {
        console.log("API ERROR::::", err.response?.data || err.message);
        socket.emit(
          "socketError",
          err.response?.data || "Ride creation failed",
        );
      }
    });
  });
}

module.exports = { initSocket };
