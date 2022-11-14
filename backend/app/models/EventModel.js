const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'Cities'
  },
})

module.exports = mongoose.model('Event', EventSchema)