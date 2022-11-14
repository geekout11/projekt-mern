const CitiesModel = require('../models/CityModel')

module.exports = {

    index: (req, res, next) => {
        CitiesModel.find({}, function (err, result) {
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
        CitiesModel.find({key:req.body.city}, function(err,city) {
            console.log(city)
        })
        const event = new EventModel({
          name: req.body.name,
          event: req.body.event,
          city: req.body.city
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
      },

}