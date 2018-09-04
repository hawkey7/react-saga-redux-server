/* @jsx */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import InboxIcon from 'resources/icons/InboxIcon'
import style from './style.css'

// const NoRecords = ({ locale }) => (
//   <span className={style.onRecords}>
//     <span><InboxIcon /></span>
//     <span>{locale && locale === 'zh' ? '暂无记录' : 'No records'}</span>
//   </span>
// )

@connect(
  state => ({
    locale: state.intl.get('locale')
  })
)
export default class NoRecords extends Component<any, any> {
  render() {
    const { locale } = this.props
    return (
      <span className={style.onRecords}>
        <span><InboxIcon /></span>
        <span>{locale && locale === 'zh' ? '暂无记录' : 'No records'}</span>
      </span>
    )
  }
}
