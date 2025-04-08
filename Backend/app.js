import express from "express";
import DoctoresRoutes from "./src/routes/Doctores.js"
import RegisterDoctoresRoutes from "./src/routes/RegisterDoctores.js"
import LoginRoutes from "./src/routes/Login.js"
import cookieParser from "cookie-parser";
import LogOutRoutes from "./src/routes/LogOut.js"
import CitasRoutes from "./src/routes/Citas.js"

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/Doctores", DoctoresRoutes)
app.use("/api/RegisterDoctores", RegisterDoctoresRoutes)
app.use("/api/Citas",CitasRoutes)
app.use("/api/login", LoginRoutes)
app.use("/api/logout", LogOutRoutes)

export default app;


