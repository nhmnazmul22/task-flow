import app from "./app.ts";
import appConfig from "@/config/appConfig";

app.listen(appConfig.PORT, () => {
  console.log(`Server running on PORT: ${appConfig.PORT}`);
});
