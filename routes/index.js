import express from 'express';
import authRoutes from './authRoutes.js';
import bookFlightRouter from './bookFlightRouter.js';
import flightRouter from './flightRouter.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/book-flight', bookFlightRouter);
router.use('/flight', flightRouter);

export default router;
