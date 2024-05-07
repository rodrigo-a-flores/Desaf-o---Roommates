import express from "express";
import roommateRoutes from '../routes/roommateRoutes.js';
import gastoRoutes from '../routes/gastoRoutes.js';
const routes = express.Router();

routes.get("/", (req, res) => {res.sendFile("index.html", { root: "./src" });});
routes.use('/roommates', roommateRoutes);
routes.use('/gastos', gastoRoutes);
routes.use('*', (req, res) => {res.status(404).send('Page Not Found');});
export default routes;