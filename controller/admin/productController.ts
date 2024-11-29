import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import ProductModel from "../../schemas/productSchema";

// ADD NEW PRODUCT
export const addNewProduct = async (req: Request, res: Response) => {
    try {
        console.log("Product body data ====> ", req.body);

        let product = await ProductModel.findOne({ title: req.body.title, isDelete: false });
        if (product) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        req.body.price = Number(req.body.price);

        if (!req.files || !(req.files as any[]).length) {
            return res.status(400).json({ message: 'No files uploaded!' });
        }

        const imagePath: string[] = [];
        const files: any[] = req.files as any[];

        files.forEach((file: any) => {
            const path = file.path.replace(/\\/g, "/");
            imagePath.push(path);
        });

        product = await ProductModel.create({ ...req.body, productImage: imagePath });
        await product.save();

        console.log("Product Added: ", product);
        res.status(201).json({ product, message: 'Product Added Successfully' });
    } catch (error) {
        console.error("Error in addNewProduct:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// GET ALL PRODUCT
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        let products = await ProductModel.find(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findById(req.query.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product is not found' });
        }
        product = await ProductModel.findByIdAndUpdate(product._id, { ...req.body });
        res.status(202).json({ product, message: 'Product is updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findById(req.query.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product is not found' });
        }
        product = await ProductModel.findByIdAndUpdate(product._id, { isdelete: true });
        res.status(200).json({ product, message: 'Product is Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};