import express from "express";
import eventRoute from "./routes/event.route.js";
import eventRegistrationRoute from "./routes/eventRegistration.route.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use("/event", eventRoute);
app.use("/eventRegistration", eventRegistrationRoute);
