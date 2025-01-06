import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URL || "";

const connectDB = async () => {
  if (!dbUrl) {
    console.error("DB_URL is not defined in the environment variables!");
    process.exit(1); // 如果 DB_URL 未定义，直接退出程序
  }

  try {
    const conn = await mongoose.connect(dbUrl); // 不需要指定 useNewUrlParser 和 useUnifiedTopology
    console.log(`Database connected with host: ${conn.connection.host}`);
  } catch (error: any) {
    console.error("DB Connect Error: ", error.message);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000); // 重试连接
  }
};

export default connectDB;
