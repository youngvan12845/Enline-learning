import { app } from "./app";
import connectDB from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
import http from "http";
import { initSocketServer } from "./socketServer";

// create a server
const server = http.createServer(app);

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// 添加根路由
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the server! API is running on /api/v1",
  });
});

// 初始化 Socket Server
initSocketServer(server);

// 启动服务器
server.listen(process.env.PORT || 8000, () => {
  console.log("Server is connected with port ", process.env.PORT || 8000);
  connectDB();
});
