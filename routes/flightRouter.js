import express from 'express';
import flightController from '../controller/flightController.js';
const router = express.Router();

router.get(`/list`, flightController.list);

export default router;
