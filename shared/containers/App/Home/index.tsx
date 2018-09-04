import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ScrollTop from 'components/ScrollTop'
import * as actions from 'actions/me'
import messages from './messages.json'
import style from './style.less'


interface Props {
  locale?: string
  route?: any
  actions?: any
}

@connect(
  (state: any) => ({
    locale: state.intl.get('locale'),
    notice: state.notice
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...actions
    }, dispatch)
  })
)

export default class Home extends Component<Props, {}> {

  componentDidMount() {
  }

  render() {
    const { locale} = this.props

    return (
      <IntlProvider messages={messages[locale || 'zh']}>
        <ScrollTop>
          <div className={style.home}>
            This is home page
          </div>
        </ScrollTop>
      </IntlProvider>
    )
  }
}
