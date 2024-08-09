const mongoose = require('mongoose');
const { Schema } = require('.');

const assistanceHistorySchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  belt: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  status: { 
    type: Boolean, 
    required: true 
  },
  totalSessionsAttended: {
    type: Number,
    default: 0
  },
  detailedHistory: [{
    date: String,
    sessionType: String
  }]
});

const AssistanceHistory = mongoose.model('AssistanceHistory', assistanceHistorySchema);

module.exports = { AssistanceHistory };
