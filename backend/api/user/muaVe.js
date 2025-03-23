import express from "express";
import { popcornInfo, showSeat } from "../../controllers/user/muaVe.js";
const routerMuaVe = express.Router()
routerMuaVe.get("/showtime_id=:showtime_id",showSeat)
routerMuaVe.get("/popcornInfo",popcornInfo)
export default routerMuaVe