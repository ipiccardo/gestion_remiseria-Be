import express from "express";
import { empleadosRouter } from "./routes/empleados";
import "dotenv/config";
import { vehiculosRouter } from "./routes/vehiculos";
import { viajesRouter } from "./routes/viajes";
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use("/api/empleados", empleadosRouter);
app.use("/api/vehiculos", vehiculosRouter);
app.use("/api/viajes", viajesRouter);

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.listen(PORT, () => {
  console.log("SERVIDOR FUNCIONANDO.");
});
