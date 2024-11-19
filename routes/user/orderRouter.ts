import { Router, Request} from "express";
import * as orderController from "../../controller/user/orderController";
import { userVerifyToken } from "../../middleware/adminVerifyToken";

const userOrderRouter: Router = Router();

// ADD NEW ORDER
userOrderRouter.post("/add-order",userVerifyToken,orderController.addNewOrder);

// GET ALL ORDER
userOrderRouter.get("/get-All-order",userVerifyToken,orderController.getAllOrder);

// GET ALL ORDER
userOrderRouter.get("/get-order",userVerifyToken,orderController.getOrder);

// GET ALL ORDER
userOrderRouter.delete("/delete-order",userVerifyToken,orderController.deleteOrder);


export default userOrderRouter;