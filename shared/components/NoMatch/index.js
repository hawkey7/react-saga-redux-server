import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class NoMatch extends Component {
  render() {
    const search = this.props.location.search
    return <Redirect to={`/home/list/SOCCER/${search}`} />
  }
}
