import express from "express";
import { QRPayment, callback, giuGhe } from "../../controllers/user/QRPayment.js";

const routerQRPayment = express.Router()
routerQRPayment.post("/giu_ghe",giuGhe)
routerQRPayment.post("/",QRPayment)
routerQRPayment.post("/callback",callback)
export default routerQRPayment