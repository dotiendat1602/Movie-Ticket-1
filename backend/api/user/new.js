import express from "express";
import { filmNew, newAboard, NewDetail, NewRelate, newVietnam } from "../../controllers/user/new.js";
const routerNew = express.Router()
routerNew.get('/', filmNew) 
routerNew.get('/vietnam',newVietnam) 
routerNew.get('/aboard', newAboard) 
routerNew.get('/new_id=:new_id', NewDetail)
routerNew.get('/film_id=:film_id', NewRelate)
export default routerNew