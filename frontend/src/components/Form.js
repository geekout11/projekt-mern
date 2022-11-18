import { useState } from 'react'
import config from '../config'
import axios from 'axios'
import Select from './Select'

import './Form.css'

const Form = (props, cities, courses) => {
  const [name, setName] = useState('')
  const [course, setEvent] = useState({ key: '', val: '' })
  const [city, setCity] = useState({ key: '', val: '' })
  const [errors, setErrors] = useState([])

  // console.log(course)


  const saveEvent = (eventObj) => {
    axios
      .post(config.api.url + '/events/add', eventObj, { mode: 'cors' })
      .then((res) => {
        console.log(res)
        props.getEvents()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const resetForm = () => {
    setName('')
    setEvent({ key: '', val: '' })
    setCity({ key: '', val: '' })
    setErrors([])
    // console.log('reset Form')
  }

  const validateForm = (e) => {
    e.preventDefault()

    let errorsValidate = []

    if (name.trim() === '') {
      errorsValidate.push('Wpisz Imie i Nazwisko')
    }

    if (course.key.trim() === '') {
      errorsValidate.push('Wybierz Szkolenie')
    }

    if (city.key.trim() === '') {
      errorsValidate.push('Wybierz Miasto')
    }

    if (errorsValidate.length > 0) {
      setErrors(
        errorsValidate.map((errorTxt, index) => {
          return <li key={index}>{errorTxt}</li>
        })
      )

      return false
    }

    const newEvent = {
      name: name,
      course: course,
      city: city,
    }

    // console.log(newEvent)
    saveEvent(newEvent)

    resetForm()
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

  // let choicesCities = props.cities.map((value, text) => (
  //   <option key={value._id} value={value.key}>
  //     {value.val}
  //   </option>
  // ))

  return (
    <div className='formWrapper'>
      <form action='#' onSubmit={validateForm}>
        <div className='wrapper'>
          <label htmlFor='name'>Imie i Nazwisko</label>
          <input
            type='text'
            id='name'
            className='type-43'
            value={name}
            onChange={handleChangeName}
          />
        </div>

        <div className='wrapper'>
          <label htmlFor='course'>Wydarzenie</label>
          <Select
            values={props.courses}
            selectedValue={course.key}
            onValueChange={handleChangeEvent}
            id='course'
          />
        </div>

        <div className='wrapper'>
          <label htmlFor='city'>Miasto</label>
          <Select
            values={props.cities}
            selectedValue={city.key}
            onValueChange={handleChangeCity}
            id='city'
          />
        </div>

        <div className='wrapper'>
          <button type='submit' className='submit'>
            Zapisz na szkolenie
          </button>
        </div>
      </form>

      <div className='errorsWrapper'>
        <ul className='errors'>{errors}</ul>
      </div>
    </div>
  )
}

export default Form
