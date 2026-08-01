import app from "./app.ts";
import appConfig from "@/config/app.js";
import connectToDatabase from "@/lib/mongodb.js";

const startServer = async () => {
  await connectToDatabase();

  app.listen(appConfig.PORT, () => {
    console.log(`Server running on PORT: ${appConfig.PORT}`);
  });
};

startServer();
