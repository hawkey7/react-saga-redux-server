/* @tsx */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router'
import queryString from 'query-string'
import { IntlProvider } from 'react-intl'
import { push } from 'react-router-redux'
import classnames from 'classnames'
import { getInitialStringLang } from 'selectors/intl'
import 'normalize.css/normalize.css'
import 'resources/fonts/fonts.css'
import * as routerActions from 'actions/router'
import * as intlActions from 'actions/intl'
import style from './style.less'
import Header from 'components/Header'

const messages = require('./messages.json')

interface RouteComponent {
  key?: number
  path: string
  exact: boolean
  strict: boolean
  component: any
}

export interface Props extends RouteComponentProps<void> {
  me: any
  ui: any
  actions: any
  router: any
  route: any
  locale?: string
  hasTradePassword: boolean
  queryLists: any
  mobileBetCurrency: any
}

interface State {
  showBrowserTip: boolean
  page: number
}

const renderRoutes = (routes: RouteComponent[], extraProps = {}, switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route: RouteComponent, i: number) => (
       <Route
         key={route.key || i}
         path={route.path}
         exact={route.exact}
         strict={route.strict}
         render={props => (<route.component {...props} {...extraProps} route={route} />)}
       />
     ))}
  </Switch>
) : null

@withRouter

@connect(
  (state: any) => ({
    router: state.router,
    me: state.me,
    ui: state.ui,
    token: state.token,
    locale: state.intl.get('locale')
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...routerActions,
      ...intlActions,
      push
    }, dispatch)
  })
)

export default class App extends Component<Props, State> {
  previousLocation = this.props.location
  constructor(props: Props) {
    super(props)
    this.state = {
      showBrowserTip: false,
      page: 1
    }
    this.closeBrowserTip = this.closeBrowserTip.bind(this)
  }

  componentWillUpdate(nextProps: Props) {
    const { location } = this.props

    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location
    }
  }

  componentDidMount() {
    this.props.actions.locationInit()
    const browser: string = window.navigator.userAgent.toLowerCase()
    const isIEOrEdge = /msie\s([\d\.]+)/.test(browser) || browser.indexOf('edge') !== -1 || /trident\/7\./.test(browser)
    this.setState({
      showBrowserTip: isIEOrEdge
    })
    this.props.actions.setLocale(getInitialStringLang())
    if (this.props.location.search.toLowerCase().includes('utm_source')) {
      localStorage.setItem('ETCGAME_UTMSOURCE', this.props.location.search)
    }
  }

  closeBrowserTip() {
    this.setState({
      showBrowserTip: false
    })
  }

  render() {
    const { router, route, location, locale } = this.props
    const search = router.location && router.location.search
    const query = queryString.parse(search)
    const withoutHeader = query.withoutHeader
    return (
      <IntlProvider messages={messages.zh}>
        <div className={style.app}>
          {<div className={classnames({ [style.appContainer]: true, ['iebrowser']: this.state.showBrowserTip})}>
            {!withoutHeader && <Header/>}
            <div className={classnames({ [style.content]: true, [style.body_main]: true})}>
                {renderRoutes(route.routes, { locale }, { location })}
            </div>
          </div>}
        </div>
      </IntlProvider>
    )
  }
}
