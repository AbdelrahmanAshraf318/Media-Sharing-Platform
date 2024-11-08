const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/user_model.js');
const userRoute = require('./routes/user_route.js')
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/users', userRoute);


app.get('/', (req, res) => {
    res.send("Hello from Node API server");
});



mongoose.connect("mongodb+srv://abdelrahmanashraf25102000:NWwAC5LJX6zNVA56@cluster0.1h0ws.mongodb.net/User-API?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });    
})
.catch(() => {
    console.log("Connection failed")
});