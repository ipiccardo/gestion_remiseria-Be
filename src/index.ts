import express from "express";
import { empleadosRouter } from "./routes/empleados";
import "dotenv/config";
import { vehiculosRouter } from "./routes/vehiculos";
import { viajesRouter } from "./routes/viajes";
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/api/empleados", empleadosRouter);
app.use("/api/vehiculos", vehiculosRouter);
app.use("/api/viajes", viajesRouter);

app.listen(PORT, () => {
  console.log("SERVIDOR FUNCIONANDO.");
});
