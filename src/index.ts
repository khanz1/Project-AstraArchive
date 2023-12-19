import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { getHello } from "./handlers/hello.handler";
import { getFile } from "./handlers/upload.handler";
import { requestActivity } from "./middleware/requestActivity.middleware";
const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(helmet());
app.use(requestActivity);

// handler
app.get("/", getHello);
app.get("*", getFile);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
