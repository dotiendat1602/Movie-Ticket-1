import express from "express";
import { khuVuc, lichChieu, rap } from "../../controllers/user/lichChieu.js";

const routerLichChieu = express.Router()
routerLichChieu.get("/khuVuc",khuVuc)
routerLichChieu.get("/khuVuc/khuVuc_id=:khuVuc_id",rap)
routerLichChieu.get("/khuVuc/khuVuc_id=:khuVuc_id/rap_id=:rap_id",lichChieu)
export default routerLichChieu;