import './Table.css'
import React, { useState } from 'react'
import config from '../config'
import axios from 'axios'
import Select from './Select'

const Table = ({ events, deleteEvent, ...rest }) => {

  const [editEvents, setEditEvents] = useState('');
  const [name, setName] = useState('')
  const [course, setEvent] = useState({ key: '', val: '' })
  const [city, setCity] = useState({ key: '', val: '' })

  // console.log(course)
  // console.log(city)

  const updateEvent = (rowId, props) => {
    if (window.confirm('Zaaktualizować użytkownika?')) {
      axios
        .put(config.api.url + '/events/update/' + rowId,
          { name, course, city }
        )
        .then((res) => {
          window.location.reload();
          props.getEvents()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleChangeName = (e) => {
    // console.log(e)
    setName(e.target.value)
  }

  const handleChangeEvent = (e) => {
    // console.log('handleChangeEvent')
    setEvent({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    })
  }

  const handleChangeCity = (e) => {
    // console.log('handleChangeCity')
    setCity({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    })
  }

  return (
    <table className='table' {...rest}>
      <thead>
        <tr>
          <th>#</th>
          <th>Imie i Nazwisko</th>
          <th>Wydarzenie</th>
          <th>Miasto</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>

        {events.map((row, index) => {

          if (editEvents === row._id) {
            return (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td><input
                  type='text'
                  id='name'
                  className='type-43'
                  value={name}
                  onChange={handleChangeName}
                /></td>
                <td>
                  <Select
                    // values={choicesEvents}
                    selectedValue={course.key}
                    onValueChange={handleChangeEvent}
                    id='course'
                  />
                </td>
                <td>
                  <Select
                    // values={choicesCities}
                    selectedValue={city.key}
                    onValueChange={handleChangeCity}
                    id='city'
                  />
                </td>
                <td><button className="save" onClick={() => updateEvent(row._id)}>Zapisz</button></td>
              </tr>
            )
          }

          return (
            <tr key={row._id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td coursekey={row.course.key}>{row.course.val}</td>
              <td citykey={row.city.key}>{row.city.val}</td>
              <td>
                <button onClick={() => deleteEvent(row._id)} className='delete'>Usuń</button>
                <button onClick={() => {
                  setName(row.name)
                  setCity(row.city)
                  setEvent(row.course)
                  setEditEvents(row._id)
                }} className='edit'>Edit</button>
              </td>
            </tr>
          )
        })}

      </tbody>
    </table >
  )
}

export default Table;
