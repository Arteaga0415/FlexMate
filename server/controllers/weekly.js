const { AssistanceWeekly } = require('../models/weekly'); 

const weekly_controllers = {
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
      // console.log("Deleted Weekly: ", deletedWeekly);
      res.status(200).send('Week deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = weekly_controllers;
