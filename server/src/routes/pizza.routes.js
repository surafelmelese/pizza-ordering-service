import express from 'express';
import multer from 'multer';
import {
    createPizzaWithToppings,
    getPizzas,
    getPizzaById,
    updatePizza,
    deletePizza,
} from '../controllers/pizza.controller.js';
import { auth } from '../middleware/auth.js';

const pizzaRouter = express.Router();
const upload = multer({ dest: 'assets/pizza/' });

pizzaRouter.get('/api/pizza', getPizzas);
pizzaRouter.post('/api/pizza', auth, upload.single('image'), createPizzaWithToppings); 
pizzaRouter.get('/api/pizza/:id', auth, getPizzaById);  
pizzaRouter.put('/api/pizza/:id', auth, upload.single('image'), updatePizza);  
pizzaRouter.delete('/api/pizza/:id', auth, deletePizza);                

export default pizzaRouter;