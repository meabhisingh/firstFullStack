const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

//Setting up the config file
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Connecting the databasehere
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `WORKING ON ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
