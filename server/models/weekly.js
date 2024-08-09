const mongoose = require('mongoose');
const { Schema } = require('.');

const assistanceWeeklySchema = new Schema({
  weekStartDate: { type: Date, required: true },
  monday: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessions: [{ sessionType: String }]
  }],
  tuesday: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessions: [{ sessionType: String }]
  }],
  wednesday: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessions: [{ sessionType: String }]
  }],
  thursday: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessions: [{ sessionType: String }]
  }],
  friday: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessions: [{ sessionType: String }]
  }],
  saturday: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessions: [{ sessionType: String }]
  }],
  sunday: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessions: [{ sessionType: String }]
  }],
});

const AssistanceWeekly = mongoose.model('AssistanceWeekly', assistanceWeeklySchema);

module.exports = { AssistanceWeekly };
