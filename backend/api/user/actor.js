import express from "express";
import { actor } from "../../controllers/user/actor.js";
const routerActor = express.Router()
routerActor.get('/actor_id=:actor_id', actor) 

export default routerActor