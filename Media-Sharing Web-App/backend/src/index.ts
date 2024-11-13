import express, { Request, Response, Router } from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import mediaRouter from './routes/media';
import router from './routes/user';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config();


const app = express();
app.use(cors());  
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

//app.use(express.static(path.join(__dirname, 'uploads')));

const MONGO_URL = "mongodb+srv://abdelrahmanashraf25102000:NWwAC5LJX6zNVA56@cluster0.1h0ws.mongodb.net/media-app?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Connected to Database!");    
})
.catch(() => {
    console.log("Connection failed")
});

app.use('/api', router);
app.use('/api', mediaRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});