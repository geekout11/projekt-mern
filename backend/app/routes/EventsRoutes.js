const express = require('express')
const eventController = require('../controllers/EventsController')
const citiesController = require('../controllers/CitiesController')
const router = express.Router()

module.exports = () => {
  // GET /events
  router.get('/', eventController.index)

  // POST /events/add
  router.post('/add', eventController.create)

  // DELETE /events/delete/:id
  router.delete('/delete/:id', eventController.delete)

  // PUT /events/update/:id
  router.put('/update/:id', eventController.update)

  return router
}