import express from 'express'
const userRouters = express.Router();

import userProductRouter from './productRouter';
import userCartRouter from './cartRouter';
import userContactRouter from './contactRouter';
import userOrderRouter from './orderRouter';
import userReviewRouter from './reviewRouter';
import userWishlistRouter from './wishlistRouter';

userRouters.use('/product',userProductRouter);
userRouters.use('/cart',userCartRouter);
userRouters.use('/contact',userContactRouter);
userRouters.use('/order',userOrderRouter);
userRouters.use('/review',userReviewRouter);
userRouters.use('/wishlist',userWishlistRouter);


export default userRouters;
