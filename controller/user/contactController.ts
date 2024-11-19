import { Request, Response } from 'express';
import contactModel from '../../schemas/contactSchema';



// SEND REQUEST USER
export const sendRequestUser = async (req: Request, res: Response) => {
    try {
        let user = await contactModel.findOne({name: req.user.name});
        console.log(user);
        if(user){
            return res.status(400).json({ message: `User is Already Sending Request...`});
        }
        user = await contactModel.create({
            ...req.body,
            user:req.user._id
        });
        res.status(201).json({user: user, message: `New Request added SuccesFully...`});   
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };