//Import express router module
import express, {Router} from 'express';
import userRouter from './user.routes.js';
import restaurantRouter from './restaurant.routes.js';
import roleRouter from './role.routes.js';
import pizzaRouter from './pizza.routes.js'
import toppingRouter from './topping.routes.js';
import orderRouter from './order.routes.js'
import cors from 'cors'

const app = express()
const router = Router()

app.use(cors());
app.use(cors({
  origin: '*', // Frontend origin
}));

router.use(userRouter)
router.use(restaurantRouter)
router.use(roleRouter)
router.use(pizzaRouter)
router.use(toppingRouter)
router.use(orderRouter)

//Export the routes
export default router;