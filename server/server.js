import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import ExampleDataRouter from "./routes/ExampleDataRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import ProtectedRouter from "./routes/ProtectedRouter.js";
import { authMiddleware } from "./middleware/AuthMiddleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/data", authMiddleware, ExampleDataRouter);
app.use("/api", ProtectedRouter);
app.use("/api/auth", AuthRouter);

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
