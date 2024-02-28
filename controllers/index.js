const { User, AssistanceHistory, AssistanceWeekly } = require('../models'); // Adjust the path as per your project structure
const mongoose = require('mongoose');

const controllers = {
  // Function to get all historical
  getAll: async (req, res) => {
    try {
      const history = await AssistanceHistory.find({});
      res.status(200).json(history);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //Function to post one historical
  postOneHistorical: async (req, res) => {
    try {
      const newHistory = new AssistanceHistory(req.body);
      await newHistory.save();
      res.status(201).json(newHistory);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  //Function to delete one historical 
  deleteOneHistorical: async (req, res) => {
    const { id } = req.params;
    // console.log('id: ', id);
    try {
      //If the Id has a wrong input (had problems so added this to check)
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(400).send('Invalid ID format');
      }
      const deletedRecord = await AssistanceHistory.findOneAndDelete({ _id: id });
      // console.log('before line 39');
      if (!deletedRecord) {
        return res.status(404).send('No record found with that ID');
      }
      res.status(200).send('Record deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //Function to get all active (where status = true)
  getActive: async (req, res) => {
    try {
      const active = await User.find({ status: true });
      console.log('Active: ', active);
      res.status(200).json(active);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Function to get all Weekly 
  getWeekly: async (req, res) => {
    try {
      const weekly = await AssistanceWeekly.find({});
      res.status(200).json(weekly);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  postOneWeekly: async (req, res) => {
    try {
      const newWeekly = new AssistanceWeekly(req.body);
      await newWeekly.save();
      res.status(201).json(newWeekly);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteAllWeekly: async (req, res) => {
    try {
      // Delete all in AssistanceWeekly
      await AssistanceWeekly.deleteMany({});
      res.status(200).send('Weekly records successfully deleted');
    } catch (error) {
      res.status(500).send('Error deleting weekly records: ', error.message);
    }
  },
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteOneUser: async (req, res) => {
    const { id } = req.params;
    // console.log('id: ', id);
    try {
      const deleteduser= await User.findOneAndDelete({ _id: id });
      if (!deleteduser) {
          return res.status(404).send('No User found with that ID');
      }
      res.status(200).send('User deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = controllers;
