import app from "./app";
import { config } from "./config/env.config";

const port = config.port;

app.listen(port, () => {
  console.log(`Server is running in ${config.nodeEnv} mode at http://localhost:${port}`);
});
