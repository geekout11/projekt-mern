const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitiesSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  val: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Cities', CitiesSchema)