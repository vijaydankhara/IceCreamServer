import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; 
import UserModel from "../../schemas/userSchema";
import { IUser } from "../../models/IUser";


// REGISTER User
export const registerUser = async (request: Request, response: Response) => {
  try {
    const { firstName, lastName, gender, email, password, mobileNo, dateOfBirth } =
      request.body;
    // Validate if all fields are provided
    if (!firstName || !lastName || !gender || !email || !password || !mobileNo || !dateOfBirth) {
      return response.status(400).json({ message: "All fields are required." });
    }
    // Check if admin already exists
    let userobj = await UserModel.findOne({ email: email }) as IUser;
    if (userobj) {
      return response.status(409).json({ message: "User already exists." });
    }
    // Hash password
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new admin
    let newUser: IUser = {
      firstName: firstName,
      email: email,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      mobileNo: mobileNo,
      password: hashPassword,
      isAdmin: false
      
    };
    userobj = await UserModel.create(newUser) as IUser;
    return response.status(201).json({ message: "Registered successfully.", userobj: userobj });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

// REGISTER ADMIN
export const registerAdmin = async (request: Request, response: Response) => {
  try {
    const { firstName, lastName, gender, email, password, mobileNo, dateOfBirth } =
      request.body;
    // Validate if all fields are provided
    if (!firstName || !lastName || !gender || !email || !password || !mobileNo || !dateOfBirth) {
      return response.status(400).json({ message: "All fields are required." });
    }
    // Check if admin already exists
    let adminobj = await UserModel.findOne({ email: email }) as IUser;
    if (adminobj) {
      return response.status(409).json({ message: "Admin already exists." });
    }
    // Hash password
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new admin
    let newAdmin: IUser = {
      firstName: firstName,
      email: email,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      mobileNo: mobileNo,
      password: hashPassword,
      isAdmin: true
    };
    adminobj = await UserModel.create(newAdmin) as IUser;
    return response.status(201).json({ message: "Registered successfully.", adminobj });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

// LOGIN USER
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Body Data ====>",req.body);
    
    // Find user by email
    let user = await UserModel.findOne({ email: email, isDelete: false });
    console.log("User Is Find ======>",user);
    
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email and Password" });
    }
    
    // Ensure password exists
    if (!user.password) {
      return res.status(500).json({ message: "User has no password set." });
    }
    
    // Check if password is valid
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Payload for JWT token
    let payload = {
      adminId: user._id
    };

    let SECRET_KEY: string | undefined = process.env.SECRETE_KEY;
    
    if (SECRET_KEY) {
      // Sign the JWT token
      let token = jwt.sign(payload, SECRET_KEY);
      console.log("TokenId........",token);
      
      return res.status(200).json({ token, message: "Login successful" });
    } else {
      return res.status(500).json({ message: "SECRET_KEY is not defined in the environment variables." });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//GET ADMIN
export const getAllAdmin = async (req: Request, res: Response) => {
  try {
    let admin = await UserModel.findById({
      isAdmin: true,
      isDelete: false,
    });
    // console.log(admin);
    if (!admin) {
      return res.status(404).json({ message: `Admin Data Not Found...!` });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

//UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findById(req.query.userId);
    console.log("user is :", user);
    
    if (!user) {
      return res.status(404).json({ message: `User Not Found...` });
    }
    user = await UserModel.findByIdAndUpdate(user._id, { ...req.body });
    res.status(201).json({ user: user, message: `User Updated Successfully...` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findById(req.query.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found..." });
    }
    user = await UserModel.findByIdAndUpdate(user._id, { isdelete: true });
    res.status(200).json({ user: user, message: `User Deleted Succesfully...` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
