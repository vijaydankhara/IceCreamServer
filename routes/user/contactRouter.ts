import { Router} from "express";
import * as contactController from "../../controller/user/contactController"
import { userVerifyToken } from "../../middleware/adminVerifyToken";

const userContactRouter: Router = Router();


// SEND REQUEST USER
userContactRouter.post("/send-Request-User",userVerifyToken,contactController.sendRequestUser);



export default userContactRouter;