import express from "express";

import {UserModel} from "../models/UserModel";

class UserController {

    // Get all users
    public static async getAllUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const users = await UserModel.find();
            res.status(200).json({data: users});
        } catch (error: any) {
            next(error);
        }
    }

    // Get a single user by ID
    public static async getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id);
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
            const user = new UserModel({
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
            const user = await UserModel.findById(id);
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
            const user = await UserModel.findByIdAndDelete(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
             res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            next(error);
        }
    }
}

export default UserController;
