import express from 'express';
import { test } from '../models/controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);

export default router;