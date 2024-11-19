import { Router, Request, Response } from "express";
import * as productController from "../../controller/user/productController";
import { userVerifyToken } from "../../middleware/adminVerifyToken";

const userProductRouter: Router = Router();



// GET ALL PRODUCT
userProductRouter.get("/get-All-Product",userVerifyToken,productController.getAllProduct);


export default userProductRouter;