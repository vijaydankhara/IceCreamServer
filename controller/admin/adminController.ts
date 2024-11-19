import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; 
import UserModel from "../../schemas/userSchema";
import { IUser } from "../../models/IUser";



// // REGISTER ADMIN
// export const registerAdmin = async (request: Request, response: Response) => {
//   try {
//     const { firstName, lastName, gender, email, password, mobileNo, dateOfBirth } =
//       request.body;
//     // Validate if all fields are provided
//     if (!firstName || !lastName || !gender || !email || !password || !mobileNo || !dateOfBirth) {
//       return response.status(400).json({ message: "All fields are required." });
//     }
//     // Check if admin already exists
//     let adminobj = await UserModel.findOne({ email: email }) as IUser;
//     if (adminobj) {
//       return response.status(409).json({ message: "Admin already exists." });
//     }
//     // Hash password
//     const salt = await bcrypt.genSalt(11);
//     const hashPassword = await bcrypt.hash(password, salt);

//     // Create new admin
//     let newAdmin: IUser = {
//       firstName: firstName,
//       email: email,
//       lastName: lastName,
//       dateOfBirth: dateOfBirth,
//       gender: gender,
//       mobileNo: mobileNo,
//       password: hashPassword,
//       isAdmin: true
//     };
//     adminobj = await UserModel.create(newAdmin) as IUser;
//     return response.status(201).json({ message: "Registered successfully.", adminobj });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const loginAdmin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Body Data ====>",req.body);
    
//     // Find admin by email
//     let admin = await UserModel.findOne({ email: email, isAdmin: true });
//     console.log("Admin Is Find ======>",admin);
    
//     // Check if admin exists
//     if (!admin) {
//       return res.status(400).json({ message: "Invalid email and Password" });
//     }
    
//     // Ensure password exists
//     if (!admin.password) {
//       return res.status(500).json({ message: "Admin has no password set." });
//     }
    
//     // Check if password is valid
//     let checkPassword = await bcrypt.compare(password, admin.password);
//     if (!checkPassword) {
//       return res.status(401).json({ message: "Invalid Password" });
//     }

//     // Payload for JWT token
//     let payload = {
//       adminId: admin._id
//     };

//     // Get the secret key from environment variables
//     let SECRET_KEY: string | undefined = process.env.SECRETE_KEY;
    
//     if (SECRET_KEY) {
//       // Sign the JWT token
//       let token = jwt.sign(payload, SECRET_KEY);
//       return res.status(200).json({ token, message: "Login successful" });
//     } else {
//       return res.status(500).json({ message: "SECRET_KEY is not defined in the environment variables." });
//     }
    
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };