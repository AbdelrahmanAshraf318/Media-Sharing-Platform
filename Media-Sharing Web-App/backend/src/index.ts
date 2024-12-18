import express, { Request, Response, Router } from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import mediaRouter from './routes/media';
import router from './routes/user';
import path from 'path';
import multer from 'multer';
import bodyParser from 'body-parser';

dotenv.config();


const app = express();
app.use(cors());  
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

// Serve static files from the 'uploads' directory


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const MONGO_URL = "mongodb+srv://<db_name>:<db_password>/<cluster_name>?";
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Connected to Database!");    
})
.catch(() => {
    console.log("Connection failed")
});

app.use('/uploads', express.static('uploads'));

app.use('/api', router);
app.use('/api', mediaRouter);


app.listen(4000, () => {
    console.log("Server is running on port 4000");
});