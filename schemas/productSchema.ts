import mongoose from "mongoose";
import { IProduct } from "../models/Iproduct";

const productSchema = new mongoose.Schema<IProduct>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    productImage: [{ type: String, required: true }],
    discount: { type: String },
    price: { type: Number, required: true },
    slashPrice: { type: Number},
    category: { type: String },
    size: [{ type: String }],
    color: [{ type: String }],    
    isDelete: {type: Boolean,  default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{
    versionKey: false
});

const ProductModel = mongoose.model('products', productSchema);

export default ProductModel;