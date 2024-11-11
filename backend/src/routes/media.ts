import express, { Request, Response } from 'express';
import { Media } from '../models/Media';
import multer from 'multer';

const mediaRouter = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

mediaRouter.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }
  
    try {
        const newMedia = new Media({
            filename: req.file.filename,
            path: req.file.path,
            contentType: req.file.mimetype,
        });
        await newMedia.save();
        res.status(201).json({ message: 'File uploaded successfully', media: newMedia });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Like a media item
mediaRouter.post('/:id/like', async (req: Request, res: Response) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            res.status(404).json({ error: 'Media not found' });
            return;
        }  
        media.likes += 1;
        await media.save();
        res.json({ message: 'Media liked', likes: media.likes });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Dislike a media item
mediaRouter.post('/:id/dislike', async (req: Request, res: Response) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            res.status(404).json({ error: 'Media not found' });
            return;
        }
  
        media.dislikes += 1;
        await media.save();
        res.json({ message: 'Media disliked', dislikes: media.dislikes });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default mediaRouter;