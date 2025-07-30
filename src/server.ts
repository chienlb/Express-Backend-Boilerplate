import app from "./app";
import { env } from "@/configs/env.config";
import { connectDatabase } from "@/configs/database.config";

const startServer = async () => {
  try {
    await connectDatabase();
    const server = app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
    const gracefulShutdown = () => {
      console.log("Received shutdown signal, closing server...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.log(error);
  }
};

startServer();
