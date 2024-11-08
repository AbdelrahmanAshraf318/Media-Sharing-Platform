const user = require('../models/user_model.js');

const getUsers = async (req, res) => {

        try {
            const users = await user.find({});
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
}

const getUser = async(req, res) => {


        try {
            const { id } = req.params;
            const User = await user.findById(id);  
            res.status(200).json(User)
        } catch (error) {
            res.status(500).json({message: error.message});
        }

} 

const createUser = async(req, res) => {

    try {
        const User = await user.create(req.body);
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}


const updateUser = async(req, res) => {
    try {
        const User = await user.findByIdAndUpdate(id, req.body);
        if(!User){
            return res.status(404).json({message: "User not found"});
        } 
        const updatedUser = await user.findById(id);
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        const User = await user.findByIdAndDelete(id);
        if(!User){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};