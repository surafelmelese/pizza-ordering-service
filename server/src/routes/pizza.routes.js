import express from 'express';
import multer from 'multer';
import path from 'path';
import {
    createPizzaWithToppings,
    getPizzas,
    getPizzaById,
    updatePizza,
    deletePizza,
} from '../controllers/pizza.controller.js';
import { auth } from '../middleware/auth.js';

const pizzaRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/pizza/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

pizzaRouter.get('/api/pizza', getPizzas);
pizzaRouter.post('/api/pizza', auth, upload.single('image'), createPizzaWithToppings); 
pizzaRouter.get('/api/pizza/:id', auth, getPizzaById);  
pizzaRouter.put('/api/pizza/:id', auth, upload.single('image'), updatePizza); 
pizzaRouter.delete('/api/pizza/:id', auth, deletePizza);                

export default pizzaRouter;