import { Router, Request, Response } from "express";
import * as reviewController from "../../controller/user/reviewController"
import { userVerifyToken } from "../../middleware/adminVerifyToken"; 


const userReviewRouter: Router = Router();


// ADD REVIEW
userReviewRouter.post("/add-review",userVerifyToken,reviewController.addReview);

// GET ALL REVIEW
userReviewRouter.get("/get-All-review",userVerifyToken,reviewController.getAllReview);


// GET REVIEW
userReviewRouter.get("/get-review",userVerifyToken,reviewController.getReview);

// UPDATE REVIEW
userReviewRouter.put("/update-review",userVerifyToken,reviewController.updateReview);

// DELETE REVIEW
userReviewRouter.delete("/delete-review",userVerifyToken,reviewController.deleteReview);



export default userReviewRouter