import express from "express";
import fs from 'fs';
import path from 'path';
import { Media } from "../models/Media";

class MediaController {
    public static async Upload(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
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
    }

    public static async likeMedia(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
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
    }

    public static async dislikeMedia(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
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
    }

    public static async getAllMedia(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const mediaItems = await Media.find(); // Retrieve all media documents
            res.status(200).json(mediaItems);
          } catch (error) {
            res.status(500).json({ error: 'Error fetching media items' });
          }
    }

    public static async deleteMedia(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const media = await Media.findById(req.params.id);
            if (!media) {
                res.status(404).json({ error: 'Media not found' })
                return;
            }
        
            // Delete the file from the file system
            const filePath = path.join(__dirname, '..', '..', media.path);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
        
            // Remove media from the database
            await media.deleteOne();
            res.status(200).json({ message: 'Media deleted successfully' });
          } catch (error) {
            res.status(500).json({ error: 'Error deleting media' });
          }
    }

}

export default MediaController;