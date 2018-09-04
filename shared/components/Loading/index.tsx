import React, { Component } from 'react'
import Spinner from 'components/Spinner'
import style from './style.css'

export default class Loading extends Component {
  render () {
    return (
      <div className={style.loading}>
        <div>
          <Spinner />
        </div>
      </div>
    )
  }
}
