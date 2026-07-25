import express, { type Express } from "express";
import router from "./route.ts";
import appConfig from "./src/config/app.ts";

const app: Express = express();

app.use("/", router);

app.listen(appConfig.PORT, () => {
  console.log(`Server running on PORT: ${appConfig.PORT}`);
});
