import { createUser, loginUser } from "../controllers/user.controller.js";
import express from 'express';

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);

export default router;