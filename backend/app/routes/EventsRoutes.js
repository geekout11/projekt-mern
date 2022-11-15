const express = require('express')
const eventController = require('../controllers/EventsController')
const citiesController = require('../controllers/CitiesController')
const courseController = require('../controllers/CourseController')
const router = express.Router()

module.exports = () => {
  // GET /events
  router.get('/', eventController.index)

  // GET /cities/all
  router.get('/cities/all', citiesController.index)

  // GET /course/all
  router.get('/course/all', courseController.index)

  // POST /events/add
  router.post('/add', eventController.create)

  // DELETE /events/delete/:id
  router.delete('/delete/:id', eventController.delete)

  // PUT /events/update/:id
  router.put('/update/:id', eventController.update)

  return router
}