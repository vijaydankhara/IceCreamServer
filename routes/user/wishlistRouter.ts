import { Router} from "express";
import * as whishlistController from "../../controller/user/wishlistController"
import { userVerifyToken } from "../../middleware/adminVerifyToken"; 

const userWishlistRouter: Router = Router();


// ADD WISHLIST
userWishlistRouter.post("/add-whishlist",userVerifyToken,whishlistController.addToWishlist);

// GET ALL WISHISH
userWishlistRouter.get("/get-All-wishlist",userVerifyToken,whishlistController.getAllWishlist);

// DELETE WISHISH
userWishlistRouter.delete("/delete-wishlist",userVerifyToken,whishlistController.deleteWishlist);



export default userWishlistRouter;