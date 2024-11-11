import express, { Request, Response, Router } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';




const loginRouter = express.Router();


loginRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log("Received username:", req.body.username);  // Log received username
    console.log("Received password:", req.body.password); 
    
    if (!username || !password) {
         console.log(res.status(400).json({ message: 'Username and password are required' }));
         return;
    }

    try {
      const user = await User.findOne({ username });
      if (!user){
        console.log(res.status(400).json({ message: 'User not found' }));
        return;
      } 
  
      // Check if passwords match
      if (password != user.password){
        console.log(res.status(400).json({ message: 'Invalid password' }));
        return;
      }
  
      // Create and send JWT token
      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default loginRouter;
