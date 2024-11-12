import express, { Request, Response } from 'express';
import { Media } from '../models/Media';
import multer from 'multer';
import * as path from 'path';
import MediaController from '../controllers/MediaController';

const mediaRouter = express.Router();

// Configure Multer for file uploads
mediaRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mediaRouter.post('/upload', MediaController.Upload);

// Like a media item
mediaRouter.post('/:id/like', MediaController.likeMedia);

// Dislike a media item
mediaRouter.post('/:id/dislike', MediaController.dislikeMedia);

// Get All media
mediaRouter.get('/media', MediaController.getAllMedia);

// Delete a media
mediaRouter.get('/media', MediaController.deleteMedia);

export default mediaRouter;