const { AssistanceHistory } = require('../models/history'); 
const mongoose = require('mongoose');

const historical_controllers = {
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
};

module.exports = historical_controllers;
