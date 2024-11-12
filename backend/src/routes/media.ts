import express, { Request, Response } from 'express';
import { Media } from '../models/Media';
import multer from 'multer';
import MediaController from '../controllers/MediaController';

const mediaRouter = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

mediaRouter.post('/upload', upload.single('file'), MediaController.Upload);

// Like a media item
mediaRouter.post('/:id/like', MediaController.likeMedia);

// Dislike a media item
mediaRouter.post('/:id/dislike', MediaController.dislikeMedia);

// Get All media
mediaRouter.get('/media', MediaController.getAllMedia);

// Delete a media
mediaRouter.get('/media', MediaController.deleteMedia);

export default mediaRouter;