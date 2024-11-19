import { Request, Response } from "express";
import reviewModel from "../../schemas/reviewSchema";

import mongoose from "mongoose";




// GET ALL REVIEW

export const getAllReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewModel.find(req.query as any);
        // console.log("review is ",review);
        
        let product = req.query.productId && req.query.productId !== "" ? [
            {
                $match: { product: new mongoose.Types.ObjectId(req.query.productId as string) }
            }
        ] : [];
        let find = [
            { $match: { isDelete: false } },
            ...product
        ];
        
        let result = await reviewModel.aggregate(find);
        res.status(200).json(result);
        return result;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };



// DELETE REVIEW
export const deleteReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewModel.findById(req.query.reviewId);
        if (!review) {
            return res.status(404).json({ message: ` This Review does not exist!` });
        }
        review = await reviewModel.findByIdAndUpdate(review._id,{ isDelete: true});
        res.status(200).json({message:`The product review has been deleted successfully.`});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };