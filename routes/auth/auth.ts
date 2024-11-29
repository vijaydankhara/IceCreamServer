import express from 'express';
const authRoutes = express.Router();
import {registerUser, registerAdmin, login,getAllAdmin} from "../../controller/user/userController";


authRoutes.post('/register-user', registerUser);
authRoutes.post('/register-admin', registerAdmin);
authRoutes.post('/login', login);
authRoutes.get('/get-admin', getAllAdmin);

export default authRoutes;