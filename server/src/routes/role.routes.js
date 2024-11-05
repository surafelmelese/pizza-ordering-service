import express from 'express';
import { auth } from '../middleware/auth.js'
import {
    getRoles,
    getRole,
    createNewRole,
    updateRoleById,
    deleteRoleById
} from '../controllers/role.controller.js';

const roleRouter = express.Router();
roleRouter.get('/api/role', auth, getRoles);
roleRouter.get('/api/role/:id', auth, getRole);
roleRouter.post('/api/role', auth, createNewRole);
roleRouter.put('/api/role/:id',auth, updateRoleById);
roleRouter.delete('/api/role/:id',auth, deleteRoleById);

export default roleRouter;
