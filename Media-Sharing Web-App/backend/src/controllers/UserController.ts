import express from "express";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import {User} from "../models/User";

class UserController {

    // Get all users
    public static async getAllUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const users = await User.find();
            res.status(200).json({data: users});
        } catch (error: any) {
            next(error);
        }
    }

    // Get a single user by ID
    public static async getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({data: user});
        } catch (error: any) {
            next(error);
        }
    }

    // Create a new user
    public static async createUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const {name, email, password, username} = req.body;
            const user = new User({
                name,
                email,
                password,
                username 
            }) ;
            await user.save();
            res.status(201).json({message: "User Created"});
        } catch (error: any) {
            next(error);
        }
    }

    // Update a user by ID
    public static async updateUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const { id } = req.params;
            const {name, email, password, username} = req.body;
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            user.name = name;
            user.email = email;
            user.password = password;
            user.username = username;   
            await user.save();
            res.status(200).json({message: "User Updated", data: user});
        } catch (error: any) {
            next(error);
        }
    }

    // Delete a user by ID
    public static async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
             res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            next(error);
        }
    }
    public static async login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
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
    }

    public static async signup(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
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
    }
}

export default UserController;
