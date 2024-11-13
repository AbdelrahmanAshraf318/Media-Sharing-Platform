import express, { Request, Response } from 'express';
import { Media } from '../models/Media';
import multer from 'multer';
import * as path from 'path';
import MediaController from '../controllers/MediaController';



const mediaRouter = express.Router();

// Set storage options for multer (store files in 'uploads' directory)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Files will be stored in 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Ensure a unique filename by appending timestamp to original file name
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });



// POST route to upload a file
mediaRouter.post('/upload', upload.single('media'), MediaController.Upload);

// Like a media item
mediaRouter.put('/like/:id', MediaController.likeMedia);

// Dislike a media item
mediaRouter.put('/dislike/:id', MediaController.dislikeMedia);

// Get All media
mediaRouter.get('/media', MediaController.getAllMedia);



export default mediaRouter;