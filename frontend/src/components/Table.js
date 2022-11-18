import './Table.css'
import React, { useState } from 'react'
import config from '../config'
import axios from 'axios'
import Select from './Select'

const Table = ({ events, getEvents, deleteEvent, cities, courses, ...rest }) => {

  const [editEvents, setEditEvents] = useState('');
  const [name, setName] = useState('')
  const [course, setCourse] = useState({ key: '', val: '' })
  const [city, setCity] = useState({ key: '', val: '' })

  // console.log(name)
  // console.log(course)
  // console.log(city)

  const updateEvent = (rowId) => {
    if (window.confirm('Zaaktualizować użytkownika?')) {
      // console.log(city)
      axios
        .put(config.api.url + '/events/update/' + rowId,
          { name, course, city }, { mode: 'cors' }
        )
        .then((res) => {
          // window.location.reload();
          getEvents()
          setEditEvents('')
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

  const handleChangeEvent = (e, id) => {
    // console.log('handleChangeEvent')
    // console.log(e.target)
    setCourse({
      // _id: e.target.options,
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

            // console.log('edycja stringa')
            // console.log(courses)
            // console.log(cities)

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
                    values={courses}
                    selectedValue={course.key}
                    onValueChange={handleChangeEvent}
                    id='course'
                  />
                </td>
                <td>
                  <Select
                    values={cities}
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
                  setCourse(row.course)
                  setCity(row.city)
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
