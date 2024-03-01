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
// const sessionSchema = new Schema({ sessionType: String }, { _id: false }); 

// const dailyAttendanceSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User' },
//   sessions: [sessionSchema]
// }, { _id: false }); 

// const assistanceWeeklySchema = new Schema({
//   weekStartDate: { type: Date, required: true },
//   monday: [dailyAttendanceSchema],
//   tuesday: [dailyAttendanceSchema],
//   wednesday: [dailyAttendanceSchema],
//   thursday: [dailyAttendanceSchema],
//   friday: [dailyAttendanceSchema],
//   saturday: [dailyAttendanceSchema],
//   sunday: [dailyAttendanceSchema],
// }, { timestamps: true }); 
