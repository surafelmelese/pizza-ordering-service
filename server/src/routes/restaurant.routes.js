import {Router} from 'express';
import {registerRestaurant} from '../controllers/restaurant.controller.js'

const restaurantRouter = Router()

restaurantRouter.post("/api/restaurant", registerRestaurant)

export default restaurantRouter