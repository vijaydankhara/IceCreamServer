import express from 'express';
const adminRoutes = express.Router();

import productRouter from './productRouter';
import adminreviewRouter from './reviewRouter';
import adminorderRouter from './orderRouter';

adminRoutes.use('/product', productRouter);
adminRoutes.use('/review', adminreviewRouter);
adminRoutes.use('/order', adminorderRouter);

export default adminRoutes;