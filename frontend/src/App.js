import axios from 'axios'
import config from './config'
import { useEffect, useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'

import './App.css'

function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = () => {
    axios
      .get(config.api.url + '/events')
      .then((res) => {
        setEvents(res.data)
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
        <Form getEvents={getEvents} />
      </div>

      <div className='table-container'>
        <Table events={events} deleteEvent={deleteEvent} className='table' />
      </div>
    </div>
  )
}

export default App
