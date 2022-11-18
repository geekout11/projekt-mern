const EventModel = require('../models/EventModel')
const CitiesModel = require('../models/CityModel')
const CourseModel = require('../models/CourseModel')

module.exports = {

  index: (req, res, next) => {
    EventModel.find()
      .populate('city')
      .populate('course')
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error while fetching Events',
            error: err,
          })
        }

        // console.log(result)

        res.json(result);
      })
  },

  create: (req, res, next) => {

    let event = {}

    CitiesModel.findOne({ key: req.body.city.key }, function (err, city) {
      CourseModel.findOne({ key: req.body.course.key }, function (err, course) {


        // console.log(course)
        // console.log(city)
        // console.log(err)

        event = new EventModel({
          name: req.body.name,
          course,
          city
        })


        // console.log(event)

        event.save((err, event) => {
          if (err) {
            return res.status(500).json({
              message: 'Error while creating Event',
              error: err,
            })
          }

          return res.status(201).json(event) // http 201 == Created
        })
      })
    })
  },

  delete: (req, res, next) => {
    const id = req.params.id
    // console.log(id)

    EventModel.findByIdAndRemove(id, (err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error while creating Event',
          error: err,
        })
      }

      return res.status(200).json({
        id: id,
        deleted: true
      }) // http 200 = OK & entity decribing status
      return res.status(204) // http 204 == No content ([No Content] if the action has been performed but the response does not include an entity.)  
    })
  },

  update: (req, res, next) => {

    CourseModel.findOne({ key: req.body.course.key }, function (err, course) {
      CitiesModel.findOne({ key: req.body.city.key }, function (err, city) {
        EventModel.updateOne({ _id: req.params.id }, { course, city }, (err, event) => {


          // console.log(req.body)
          // console.log(course)
          // console.log(city)
          // console.log(event)

          if (err) {
            res.status(500).json({
              message: 'Error while updating Event',
              error: err
            })
          } else {
            res.status(200).json({
              message: 'Event has been updated'
            })
          }

          // console.log(course)

        })
      })
    })
  }

}
