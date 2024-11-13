import express from "express";
import fs from 'fs';
import path from 'path';
import { Media } from "../models/Media";
import mongoose from 'mongoose';


class MediaController {
    public static async Upload(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
      console.log(req.file!);
      const { filename, mimetype } = req.file!;
      const mediaType = mimetype.startsWith('image') ? 'image' : 'video';
      
      
      const newMedia = new Media({
        filename,
        url: `/uploads/${filename}`,  // Correct usage of template literals
        type: mediaType,
      });
    
      await newMedia.save();
      res.json(newMedia);

    }

    public static async likeMedia(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
      let { id } = req.params;
      
    id = id.replace(/^:/, ''); // Sanitizing the ID
      console.log("Received like request for ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid media ID' });
        return;
    }

    try {
        const media = await Media.findOneAndUpdate(
            { _id: id },
            { $inc: { likes: 1 } }, // Atomically increment the 'likes' field
            { new: true } // Return the updated document
        );

        if (!media) {
          console.log("Media not found for ID:", id);
          res.status(404).json({ message: 'Media not found' });
            return ;
        }

        console.log("Successfully liked media:", media);
        res.json(media);
    } catch (error) {
        console.error("Error during like operation:", error);
        res.status(500).json({ message: 'Server error' });
    }
    }

    public static async dislikeMedia(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
      const { id } = req.params;
      console.log(`DisLike request received for media with ID: ${id}`);
      console.log(`Like request received for media with ID: ${id}`);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ObjectId:", id);
        res.status(400).json({ message: 'Invalid media ID' });
        return;
    }
      try {
          // Check if the media exists
          const media = await Media.findById(id);
          if (!media) {
              console.log("Media not found with ID:", id);
              res.status(404).json({ message: 'Media not found' });
              return ;
          }
          console.log('Found media:', media);
  
          // Increment likes and save
          media.dislikes += 1;
          await media.save();
  
          console.log('Updated media:', media);
          res.json(media);
      } catch (error) {
          console.log("Server error during like operation:", error);
          res.status(500).json({ message: 'Server error',  error});
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

    
}

export default MediaController;