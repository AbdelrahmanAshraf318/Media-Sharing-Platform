import  express  from 'express';
import mongoose from "mongoose";
import router from './routes/route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const MONGO_URL = "mongodb+srv://abdelrahmanashraf25102000:NWwAC5LJX6zNVA56@cluster0.1h0ws.mongodb.net/User-API?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Connected to Database!");    
})
.catch(() => {
    console.log("Connection failed")
});

app.use('/', router);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});