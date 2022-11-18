const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  val: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Course', CourseSchema)