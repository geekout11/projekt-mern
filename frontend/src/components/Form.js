import { useState } from 'react'
import config from '../config'
import axios from 'axios'
import Select from './Select'

import './Form.css'

const Form = (props) => {
  const [name, setName] = useState('')
  const [event, setEvent] = useState({ key: '', val: '' })
  const [city, setCity] = useState({ key: '', val: '' })
  const [errors, setErrors] = useState([])

  const choicesEvents = [
    ['', '---'],
    ['front-end-react', 'Front End - ReactJS'],
    // ['front-end-vue', 'Front End - VUE'],
    // ['front-end-angular', 'Front End - Angular'],
    ['back-end-node-js', 'Back End - Node.js'],
    // ['back-end-node-java', 'Back End - Java'],
    // ['back-end-node-python', 'Back End - Python'],
    // ['back-end-node-php', 'Back End - PHP'],
    // ['back-end-node-Csharp', 'Back End - C#'],
    ['full-stack-mern', 'Full Stack - MERN'],
    // ['full-stack-mevn', 'Full Stack - MEVN'],
    // ['full-stack-mean', 'Full Stack - MEAN'],
    // ['full-stack-java-react', 'Full Stack - Java + React'],
    // ['full-stack-java-vue', 'Full Stack - Java + Vue'],
    // ['full-stack-java-angular', 'Full Stack - Java + Angular'],
    // ['data-analysis-python', 'Analiza danych - Python'],
    ['tester-manual', 'Tester Manualny'],
  ]

  const choicesCities = [
    ['', '---'],
    ['online', 'Online'],
    ['warszawa', 'Warszawa'],
    ['krakow', 'Kraków'],
    // ['trojmiasto', 'Trójmiasto'],
    // ['lublin', 'Lublin'],
  ]

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

    if (event.key.trim() === '') {
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
      event: event,
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
          <label htmlFor='event'>Wydarzenie</label>
          <Select
            values={choicesEvents}
            selectedValue={event.key}
            onValueChange={handleChangeEvent}
            id='event'
          />
        </div>

        <div className='wrapper'>
          <label htmlFor='city'>Miasto</label>
          <Select
            values={choicesCities}
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
