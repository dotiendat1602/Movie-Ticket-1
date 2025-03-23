import express from "express";
import { cinema, cinemaID } from "../../controllers/user/cinema.js";
const routerCinema = express.Router()
routerCinema.get("/region_id=:region_id" ,cinema) 
routerCinema.get("/cinema_id=:cinema_id", cinemaID)
export default routerCinema