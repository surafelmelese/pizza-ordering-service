import express from 'express';
import {
    getToppings,
    createTopping,
    getToppingById,
    updateTopping,
    deleteTopping,
} from '../controllers/topping.controller.js';
import { auth } from '../middleware/auth.js';

const toppingRouter = express.Router();

toppingRouter.get('/api/topping', auth, getToppings);                
toppingRouter.post('/api/topping', auth, createTopping);               
toppingRouter.get('/api/topping/:id', auth, getToppingById);           
toppingRouter.put('/api/topping/:id', auth, updateTopping);            
toppingRouter.delete('/api/topping/:id', auth, deleteTopping); 

export default toppingRouter;