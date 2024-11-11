import express, { Request, Response, Router } from 'express';
import { User } from '../models/User';


const signupRouter: Router = express.Router();

// POST route for user sign-up
signupRouter.post('/signup', async (req: Request, res: Response) => {

  const { name, email, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       console.log(res.status(400).json({ message: 'User already exists' }))
       return;
    }

    // Create a new user
    const newUser = new User({ name, email, username, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default signupRouter;