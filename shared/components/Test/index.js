/* eslint-disable */
import { DatePicker, List, Button, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import messages from './messages.json'
import * as actions from 'actions/record'
const dateFormat = 'YYYY/MM/DD'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcOffset = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))

@connect(
  state => ({
    me: state.me,
    locale: state.intl.get('locale'),
    account: state.account,
    record: state.record
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions
    }, dispatch)
  })
)

class Test extends React.Component {
  state = {
    dpValue: now,
    idt: utcOffset.toISOString().slice(0, 10),
  }
  onChangeOne(date) {
    this.setState({ date })
    const From = parseInt(new Date(date).getTime() / 86400000) * 86400000 - 28800000
    this.props.actions.setFromTimeAndToTime({ from: From, to: 0 })
  }

  onChangeTwo(date) {
    this.setState({ date })
    const To = parseInt((new Date(date).getTime() + 86400000) / 86400000) * 86400000 - 28800000
    const From = this.props.record.get('from')
    const currency = this.props.me.get('mobileBetCurrency')
    if (From > To) {
      this.props.actions.setFromTimeAndToTime({ from: To, to: From })
    }
    this.props.serachList(From, From === To ? To + 86400000 : To, currency)
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { isOne } = this.props

    return (<form>
      <List
        className="date-picker-list"
        renderFooter={() => getFieldError('dp') && getFieldError('dp').join(',')}
      >
        <DatePicker
          mode="date"
          title="Select Date"
          extra={isOne ? messages[this.props.locale]['time_start'] : messages[this.props.locale]['time_end']}
          value={this.state.date}
          onChange={date => (isOne ? this.onChangeOne(date) : this.onChangeTwo(date))}
        >
          <List.Item arrow="horizontal">Date</List.Item>
        </DatePicker>
      </List>
    </form>);
  }
}

export const TestWrap = createForm()(Test)
