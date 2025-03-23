import express from "express";
import { userFilmLiked, userInfo, userInfoUpdate, userNew } from "../../controllers/user/userInfo.js";

const routerUserInfo = express.Router()
routerUserInfo.post("/",userInfo)
routerUserInfo.post("/update",userInfoUpdate)
routerUserInfo.post("/filmLiked",userFilmLiked)
routerUserInfo.post("/filmNew",userNew)
export default routerUserInfo; 