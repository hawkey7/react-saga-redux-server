/* @jsx */
/* global __webpack_hash__ */
/* eslint-disable arrow-parens,no-inner-declarations */

import cluster from 'cluster'
import os from 'os'
import path from 'path'
import axios from 'axios'
import Express from 'express'
import Log4js from 'log4js'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createMemoryHistory } from 'history'
import { renderRoutes } from 'react-router-config'
import cookie from 'react-cookie'
import serialize from 'serialize-javascript'
import Transit from 'transit-immutable-js'
import { getInitialLang } from 'selectors/intl'
import { flushTitle } from 'components/DocumentTitle'
import Provider from 'components/Provider'
import ConnectedRouter from 'components/ConnectedRouter'
import configure from 'store'
import routes from 'routes'
import sagas from 'sagas'
import { GATEWAY_API_URL } from 'constants/env'

const numCPUs = os.cpus().length

const log4jsConfig = require('./log4js.config.json')
Log4js.configure(log4jsConfig);
const logger = Log4js.getLogger('index')

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)
  logger.info(`Master ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`)
    logger.info(`worker ${worker.process.pid} died`)
  })
} else {
  const renderFullPage = (root, title, state, chunks) => `
  <!DOCTYPE html>
  <!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
  <!--[if IE 7 ]>    <html class="ie7"> <![endif]-->
  <!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
  <!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
  <!--[if (gt IE 9) ]>    <html class="ie"> <![endif]-->
  <!--[if !(IE)]><!--> <html> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <link href="/styles/bundle.css?v=${__webpack_hash__}" rel="stylesheet">
    <link rel="shortcut icon" href="/images/favicon.png">
  </head>
  <body>
    <div id="app">${root}</div>
    <div id="modal-root"></div>
    <script>window.__PRELOADED_STATE__ = ${serialize(Transit.toJSON(state), { isJSON: true })}</script>
    <script>window.__PRELOADED_CHUNKS__ = ${JSON.stringify(chunks)}</script>
    <script src="/scripts/vendor.bundle.js?v=${__webpack_hash__}"></script>
    <script src="/scripts/bundle.js?v=${__webpack_hash__}"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-118864224-2"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-118864224-2');
    </script>
    <!-- GrowingIO Analytics code version 2.1 -->
    <!-- Copyright 2015-2017 GrowingIO, Inc. More info available at http://www.growingio.com -->
    <script type='text/javascript'>
    !function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.growingio.com/2.1/gio.js","gio");
      gio('init', 'a788770f033cbb08', {});
      //custom page code begin here
      //custom page code end here
      gio('send');
    </script>
    <!-- End GrowingIO Analytics code version: 2.1 -->
  </body>
  </html>
`
  const port = 9090
  const app = new Express()

  app.use(Log4js.connectLogger(Log4js.getLogger('http'), { level: 'trace' }));
  app.use(cookieParser())
  app.use(compression())
  app.use('/fonts', Express.static(path.join(__dirname, '/fonts')))
  app.use('/images', Express.static(path.join(__dirname, '/images')))
  app.use('/styles', Express.static(path.join(__dirname, '/styles')))
  app.use('/scripts', Express.static(path.join(__dirname, '/scripts')))
  app.use('/charting_library', Express.static(path.join(__dirname, '/charting_library')))

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })

  app.get('*', async (req, res) => {
    try {
      cookie.plugToRequest(req, res)
      const context = { preloadedChunks: [] }
      if (context.url) {
        res.redirect(301, context.url)
        logger.info(`301： url${context.url}`)
      } else {
        async function sendHtml() {
          const ip = (req.header('x-forwarded-for') || '').match(/\d+\.\d+\.\d+\.\d+/)
          let ipLocation = 1
          try {
            const ipInfo = await axios.get(`${GATEWAY_API_URL}/ip/info?ip=${ip}`, {
              headers: { Origin: `${req.protocol}://${req.get('host')}` }
            });
            ipLocation = ipInfo && ipInfo.data.status
            logger.info(`get ip info success: req headers: ${JSON.stringify(req.headers)}, client ip: ${ip}, api result: ${JSON.stringify(ipInfo.data)}, ip location: ${ipLocation}`)
          } catch (error) {
            logger.error(`get ip info error: ${error}, client ip: ${ip},  header origin: ${req.protocol}://${req.get('host')}`)
          }
          const history = createMemoryHistory({ initialEntries: [req.url] })
          const store = configure({ intl: getInitialLang(req.url, ipLocation) }, history)
          const preloadedState = store.getState()
          const rootTask = store.runSaga(sagas)
          store.close()
          await rootTask.done
          const html = ReactDOMServer.renderToString(
            <Provider store={store}>
              <ConnectedRouter history={history} location={req.url} context={context}>
                {renderRoutes(routes)}
              </ConnectedRouter>
            </Provider>
          )
          const title = flushTitle()
          const preloadedChunks = context.preloadedChunks

          res.status(200).send(renderFullPage(html, title, preloadedState, preloadedChunks))
          logger.info(`200:  title: ${title}, ip: ${ip}, env: ${app.get('env')}, getway: ${GATEWAY_API_URL}`)
        }
        sendHtml()
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error.message}`)
      logger.error(`500： ${error}`)
    }
  })

  app.listen(port, () => console.log(`Listening on port ${port}`))
  console.log(`Worker ${process.pid} started`)
}
