import './Select.css';
import React, { useState, useEffect } from 'react';



const Select = ({ values, onValueChange, selectedValue, ...rest }) => {

  // console.log(values)
  // values.forEach((value) => {
  //   console.log(value.key)
  // })

  return (
    <select
      value={selectedValue}
      onChange={(event) => onValueChange(event)}
      {...rest} >

      {values.map((value, text) => (
        <option key={value._id} value={value.key}>
          {value.val}
        </option>
      ))}
    </select>
  )
}

export default Select