import express from "express";
import cors from "cors";
import routes from "./routes/routes";

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 50804;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

app.use("/server", routes);

export default app;

