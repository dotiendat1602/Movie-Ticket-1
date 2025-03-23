import express from "express";
import { filmInfo, filmSearchByName, filmShowing, filmShowTimeInfo, filmType, getComment, phim, postComment } from "../../controllers/user/film.js";
const routerFilm = express.Router()
routerFilm.get("/filmShowing" ,filmShowing) 
routerFilm.get("/filmInfo/id=:id",filmInfo)
routerFilm.get("/filmInfo/id=:id/lichChieu/khuVuc_id=:khuVuc_id",filmShowTimeInfo)
routerFilm.get("/filmInfo/getComment/id=:id",getComment)
routerFilm.post("/filmInfo/postComment",postComment)
routerFilm.post("/phim", phim)
routerFilm.get("/searchFilm/:q",filmSearchByName)
routerFilm.get("/category_id=:category_id", filmType)
export default routerFilm;