import express from "express";
import { director } from "../../controllers/user/director.js";
const routerDirector = express.Router()
routerDirector.get('/director_id=:director_id', director) 

export default routerDirector