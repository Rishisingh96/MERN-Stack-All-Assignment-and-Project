const dotenv = require("dotenv");
const connectDB = require("./src/config/database");

const app = require("./src/app");

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();













// Node js 
// const http = require("http");

// const server = http.createServer((req, res) =>{
//     res.write("Hello World from Node.js");
//     res.end();
// })

// server.listen(5000, ()=>{
//     console.log("Server is running on http://localhost:5000");
// })

// Express js
// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./src/config/database");

// dotenv.config();

// const app = express();

// // Connect Database
// connectDB();

// app.get("/", (req, res) => {
//   res.send("Student Management API");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });