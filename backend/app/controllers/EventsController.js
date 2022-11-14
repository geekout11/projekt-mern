const EventModel = require('../models/EventModel')

module.exports = {
  index: (req, res, next) => {
    EventModel.find({}, function(err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error while fetching Events',
          error: err,
        })
      } 

      res.json(result);
    })
  },

  create: (req, res, next) => {
    const event = new EventModel({
      name: req.body.name,
      event: req.body.event,
      city: req.body.city
    })

    event.save((err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error while creating Event',
          error: err,
        })
      }

      return res.status(201).json(event) // http 201 == Created
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

      return res.status('200').json({
        id: id,
        deleted: true
      }) // http 200 = OK & entity decribing status
      return res.status(204) // http 204 == No content ([No Content] if the action has been performed but the response does not include an entity.)  
    })
  },

  update: (req, res, next) => {

    EventModel.findByIdAndUpdate(req.params.id, req.body, (err, event) => {
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
    })
  }
}
