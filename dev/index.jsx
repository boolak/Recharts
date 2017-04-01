import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './Root'
import configureStore from './stores/configureStore'
require('babel-polyfill')
var Immutable = require('immutable')


const store = configureStore()
//保持历史同步
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Root store={store} history={history} />,
  document.getElementById('App')
)