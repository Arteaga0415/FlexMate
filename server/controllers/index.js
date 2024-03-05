const { User, AssistanceHistory, AssistanceWeekly } = require('../models'); 
const mongoose = require('mongoose');
// import { User, AssistanceHistory, AssistanceWeekly } from '../models';
// import mongoose from 'mongoose';
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
  getOneHistorical: async (req, res) => {
    const { id } = req.params;
    try {
      const userHistory = await AssistanceHistory.findOne({ userId: id });
      res.status(200).json(userHistory);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  postOneHistorical: async (req, res) => {
    const { userId, name, belt, type, status, detailedHistory } = req.body;
    //console.log('user: ', userId, 'Details: ', detailedHistory);
    try {
      // Check if a document for the given userId already exists
      const existingHistory = await AssistanceHistory.findOne({ userId });
      if (existingHistory) {
        // If it exists, push new sessions into the detailedHistory array
        existingHistory.detailedHistory.push(...detailedHistory);
        existingHistory.totalSessionsAttended += detailedHistory.length;
        await existingHistory.save();
        res.status(200).json(existingHistory);
      } else {
        // If it doesn't exist, create a new document
        const newHistory = new AssistanceHistory({
          userId,
          name,
          belt,
          type,
          status,
          totalSessionsAttended: detailedHistory.length,
          detailedHistory
        });
        await newHistory.save();
        res.status(201).json(newHistory);
      }
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
  deleteAllHistorical: async (req, res) => {
    try {
      // Delete all in Historical Assistance
      await AssistanceHistory.deleteMany({});
      res.status(200).send('Historical records successfully deleted');
    } catch (error) {
      res.status(500).send('Error deleting Historical records: ', error.message);
    }
  },
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Function to get all Weekly 
  getWeekly: async (req, res) => {
    try {
      const weekly = await AssistanceWeekly.find({});
      if (!weekly) {
        return res.status(400).send('Bad request')
      }
      res.status(200).json(weekly);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  postOneWeekly: async (req, res) => {
    try {
      const newWeekly = new AssistanceWeekly(req.body);
      if (!newWeekly) {
        return res.status(400).send('Bad request, no body')
      }
      await newWeekly.save();
      res.status(201).json(newWeekly);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updateWeeklyAssistance: async (req, res) => {
    const { weekStartDate, day, userId, sessions } = req.body; 
    //console.log('Here day: ', day);
    // Push the clases to the correct day on the schema 
    const update = {
      $push: {
        [day]: {
          userId,
          sessions
        }
      }
    };
    try {
      const options = { new: true, upsert: true }; 
      const filter = { weekStartDate: new Date(weekStartDate) };
      //the weekStartdate is used to find the schema to update and options will create a new schema if none exist.
      const updatedDocument = await AssistanceWeekly.findOneAndUpdate(filter, update, options);
      if (!updatedDocument) {
        return res.status(404).send('Data formated incorrectly');
      }
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).send(error.message);
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
  deleteOneWeekly: async (req, res) => {
    const { id } = req.params;
    // console.log('id: ', id);
    try {
      const deletedWeekly = await AssistanceWeekly.findOneAndDelete({ _id: id });
      if (!deletedWeekly) {
        return res.status(404).send('No Week found with that ID');
      }
      console.log("Deleted Weekly: ", deletedWeekly);
      res.status(200).send('Week deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
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

module.exports = controllers;
