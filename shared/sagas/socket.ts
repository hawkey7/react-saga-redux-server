import { eventChannel, delay } from 'redux-saga'
import { call, fork, put, take, race, select, all, takeEvery } from 'redux-saga/effects'
import cookie from 'react-cookie'
import { WEBSOCKET_API_URL } from 'constants/env'
import * as socketActions from 'actions/socket'
import * as messageActions from 'actions/message'
import { isMobile } from 'utils/platform'

let reconnectInterval = 2000

function createSocketChannel(socket: any) {
  return eventChannel((emit) => {
    const updateDetail = (data: any) => {
      // emit(detailActions.updateDetail(data))
      if (data.type === 'odds') {
        const existOddsData = localStorage.getItem('ETCGAME_ODDS_UPDATE')
        const localData = existOddsData ? JSON.parse(existOddsData).filter((item: any) => {
          if (item.groupId === data.groupId && item.eventId === data.eventId) {
            item.odds = data.odds
            if (data.handicap) item.handicap = data.handicap
          }
          return true
        }) : [data]
        localStorage.setItem('ETCGAME_ODDS_UPDATE', localData)
      }
    }

    socket.onopen = () => {
      emit(socketActions.connectSucceeded())
      const token = (!isMobile && cookie.load('game_t')) ? `Bearer ${cookie.load('game_t')}` : null
      if (token) emit(socketActions.authenticate(token))
      emit(socketActions.subscribe({ channel: '*' }))
      emit(socketActions.executeQueueActions())
      reconnectInterval = 2000
    }

    socket.onerror = () => {}

    socket.onclose = () => {
      emit(socketActions.close())
    }

    socket.onmessage = (event: any) => {
      if (!event.data) return

      try {
        const message = JSON.parse(event.data)
        const { msgType, ...data } = message
        updateDetail(data)
      } catch (e) {
        console.log(e)
      }
    }

    return () => {
      socket.close()
    }
  })
}

function* subscribe(socket: any, actionType: string) {
  while (true) {
    const action = yield take(actionType)
    try {
      if (Number(socket.readyState) === 1) {
        socket.send(JSON.stringify({ msgType: 'SubscribeChannelRequest', channel: action.payload.channel }))
      } else {
        yield put(socketActions.addActionToQueue(action))
      }
    } catch (e) {
      console.error(e)
    }
  }
}

function* authenticate(socket: any, actionType: string) {
  yield put(socketActions.initMessageSocket())
  while (true) {
    const action = yield take(actionType)
    try {
      if (Number(socket.readyState) === 1) {
        socket.send(JSON.stringify({ msgType: 'LoginRequest', authorization: action.payload }))
      } else {
        yield put(socketActions.addActionToQueue(action))
      }
    } catch (e) {
      console.error(e)
    }
  }
}

function* logout(socket: any, actionType: string) {
  while (true) {
    const action = yield take(actionType)
    try {
      if (Number(socket.readyState) === 1) {
        socket.send(JSON.stringify({ msgType: 'LogoutRequest' }))
      } else {
        yield put(socketActions.addActionToQueue(action))
      }
    } catch (e) {
      console.error(e)
    }
  }
}

function* externalListener(socketChannel: any) {
  while (true) {
    const action = yield take(socketChannel)
    yield put(action)
  }
}

function* internalListener(socket: any) {
  yield fork(subscribe, socket, String(socketActions.subscribe))
  yield fork(authenticate, socket, String(socketActions.authenticate))
  yield fork(logout, socket, String(socketActions.logout))
}

function* executeQueueActions() {
  const actionQueue = yield select((state: RootState) => state.socket.get('actionQueue').toJS())
  for (const action of actionQueue) {
    yield put(action)
  }
  yield put(socketActions.clearQueueActions())
}

function* checkSocketConnection(action: any) {
  const connected = yield select((state: RootState) => state.socket.get('connected'))
  if (!connected) yield put(socketActions.addActionToQueue(action))
}

function* init() {
  while (true) {
    const socket = new WebSocket(`${WEBSOCKET_API_URL}/odds`)
    const socketChannel = yield call(createSocketChannel, socket)
    const { cancel, connectFaild } = yield race(({
      task: all([
        call(externalListener, socketChannel),
        call(internalListener, socket)
      ]),
      cancel: take(String(socketActions.stop)),
      connectFaild: take(String(socketActions.connectFailed))
    }))

    if (cancel || connectFaild) {
      socketChannel.close()
    }
  }
}

function* initMessageSocket() {
  const token = cookie.load('game_t')
  if (!token) {
    return
  }
  const socket = new WebSocket(`${WEBSOCKET_API_URL}/private?access_token=${token}`)
  yield call(socketChanel, socket)
  function socketChanel(socket: any) {
    socket.onopen = () => {
      socket.send(JSON.stringify({ msgType: 'SubscribeChannelRequest', channel: '*' }))
    }
    socket.onmessage = (event: any) => {
      if (!event) return
      try {
        const data = JSON.parse(event)
        messageActions.getMessageDetailRequested(data.messageId)
      } catch (e) {
        console.log(e)
      }
    }
  }

}

function* close() {
  yield delay(reconnectInterval)
  yield put(socketActions.stop())
  reconnectInterval = reconnectInterval + 2000
}

export default function* socketSaga() {
  yield takeEvery(String(socketActions.init), init)
  yield takeEvery(String(socketActions.executeQueueActions), executeQueueActions)
  yield takeEvery(String(socketActions.close), close)
  yield takeEvery(String(socketActions.subscribe), checkSocketConnection)
  yield takeEvery(String(socketActions.authenticate), checkSocketConnection)
  yield takeEvery(String(socketActions.logout), checkSocketConnection)
  yield takeEvery(String(socketActions.initMessageSocket), initMessageSocket)
}
