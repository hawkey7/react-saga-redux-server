/* @jsx */

import React from 'react'
import { connect, Provider as ReduxProvider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import ja from 'react-intl/locale-data/ja'
import ko from 'react-intl/locale-data/ko'
import ru from 'react-intl/locale-data/ru'
import vi from 'react-intl/locale-data/vi'

addLocaleData(en)
addLocaleData(zh)
addLocaleData(ja)
addLocaleData(ko)
addLocaleData(ru)
addLocaleData(vi)

const mapStateToProps = state => ({
  locale: state.intl.get('locale')
})

const ConnectedIntlProvider = connect(mapStateToProps)(IntlProvider)

const Provider = ({ store, children }) => (
  <ReduxProvider store={store}>
    <ConnectedIntlProvider>
      {children}
    </ConnectedIntlProvider>
  </ReduxProvider>
)

export default Provider
