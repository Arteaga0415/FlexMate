const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/GracieColombiaDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  membership: { type: String, required: true },
  status: { type: Boolean, required: true },
  date: { type: Date, required: true },
  email: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: Number, required: true },
  belt: { type: String, required: true },
  classesInBelt: { type: Number, required: false }
});

const assistanceWeeklySchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  weekStartDate: { 
    type: Date, 
    required: true 
  },
  attendedSessions: [{
    date: Date,
    sessionType: String
  }]
});

const assistanceHistorySchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  totalSessionsAttended: {
    type: Number,
    default: 0
  },
  detailedHistory: [{
    date: Date,
    sessionType: String
  }]
});

const User = mongoose.model('User', userSchema);
const AssistanceWeekly = mongoose.model('AssistanceWeekly', assistanceWeeklySchema);
const AssistanceHistory = mongoose.model('AssistanceHistory', assistanceHistorySchema);

module.exports = { User, AssistanceWeekly, AssistanceHistory };