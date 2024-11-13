import express from "express";

import UserController from "../controllers/UserController";

const router = express.Router();


router.get('/user', UserController.getAllUser);
router.get('/user/:id', UserController.getUser);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

export default router;