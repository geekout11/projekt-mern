import axios from 'axios'
import config from './config'
import { useEffect, useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'

import './App.css'

function App() {
  const [events, setEvents] = useState([])
  const [cities, setCities] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getEvents()
    getCities()
    getCourses()
  }, [])

  const getEvents = () => {
    axios
      .get(config.api.url + '/events')
      .then((res) => {
        setEvents(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getCities = (_id) => {
    axios
      .get(config.api.url + '/cities/all')
      .then((res) => {
        setCities(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getCourses = () => {
    axios
      .get(config.api.url + '/course/all')
      .then((res) => {
        setCourses(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteEvent = (rowId) => {
    if (window.confirm('Usunąć zapis na szkolenie?')) {
      // console.log('usuwamy: ' + rowId)
      axios
        .delete(config.api.url + '/events/delete/' + rowId)
        .then((res) => {
          if (res.data.deleted) {
            getEvents()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className='App'>
      <div className='form-container'>
        <Form getEvents={getEvents} events={events} courses={courses} cities={cities} />
      </div>

      <div className='table-container'>
        <Table getEvents={getEvents} events={events} deleteEvent={deleteEvent} courses={courses} cities={cities} className='table' />
      </div>
    </div>
  )
}

export default App
