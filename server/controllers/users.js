const { User } = require('../models/users'); 

const user_controllers = {
  //Function to get all active (where status = true)
  getActive: async (req, res) => {
    try {
      const active = await User.find({ status: true });
      if (!active) {
        return res.status(400).send('Bad request')
      }
      //console.log('Active: ', active);
      res.status(200).json(active);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //Function to get all inactive (where status = false)
  getInactive: async (req, res) => {
    try {
      const active = await User.find({ status: false });
      if (!active) {
        return res.status(400).send('Bad request')
      }
      //console.log('Active: ', active);
      res.status(200).json(active);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //Function to get all users 
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  postUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      if (!newUser) {
        return res.status(404).send('No data on the request');
      }
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteOneUser: async (req, res) => {
    const { id } = req.params;
    // console.log('id: ', id);
    try {
      const deleteduser = await User.deleteOne({ _id: id });
      if (!deleteduser) {
        return res.status(404).send('No User found with that ID');
      }
      console.log('Deleted user: '. deletedUser);
      res.status(200).send('User deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = user_controllers;
