import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import apolloClient from 'client/apolloClient'
import { clientRouter, history } from './router'
import createStore from './store'
import './client/websockets'
import { rootDomId } from 'client/util'

// // TODO: For testing
// apolloClient.clearStore()

const store = createStore(history)

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      { clientRouter() }
    </Provider>
  </ApolloProvider>,
  document.getElementById(rootDomId)
)
