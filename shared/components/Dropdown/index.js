/* @jsx */

import React from 'react'
import style from './style.css'

const Dropdown = ({ children }) => (
  <div className={style.dropdown}>
    <div className={style.arrow} />
    <div className={style.container}>
      {children}
    </div>
  </div>
)

export default Dropdown
