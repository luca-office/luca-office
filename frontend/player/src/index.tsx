import "regenerator-runtime/runtime.js"
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"
import {onError} from "@apollo/client/link/error"
import {Global} from "@emotion/react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {applyMiddleware, createStore, Store} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {createRoot} from "react-dom/client"
import "react-tooltip/dist/react-tooltip.css"

import {updateNotification} from "shared/redux/actions/ui-action"
import {globalStyle} from "shared/styles"
import {initLucaI18n} from "shared/translations"
import {createBackendEventUpdater, initSurveyEventQueue, Option} from "shared/utils"
import {isSpecificError, LucaErrorType, mapErrorToNotification} from "shared/utils/errors"
import {App, AppNotificationContainer} from "./modules"
import {appReducer} from "./redux/reducers/app-reducer"
import {AppState, initialAppState} from "./redux/state/app-state"

export const createReduxStore = (surveyId: UUID | null) => {
  const middlewares = applyMiddleware(thunk)
  const enhancers = composeWithDevTools(middlewares)

  return createStore(appReducer, initialAppState(surveyId), enhancers)
}

const createApolloClient = ({getState, dispatch}: Store<AppState>) => {
  const cache = new InMemoryCache()

  const httpLink = new HttpLink({
    uri: "/backend/office/graphql",
    credentials: "same-origin",
    headers: {
      "Participant-Token": getState().data.surveyInvitation.token.orNull() ?? ""
    }
  })

  const authorizationLink = setContext(async (_, {headers}) => ({
    headers: {
      ...headers,
      "Participant-Token": getState().data.surveyInvitation.token.orNull()
    }
  }))

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({message, locations, path, extensions}) => {
        console.table({message, locations, path, type: extensions?.type})

        // if (!isSpecificError(extensions?.type)) {
        //   dispatch(updateNotification(Option.of(mapErrorToNotification(LucaErrorType.GeneralError))))
        // }
      })
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  const link = ApolloLink.from([authorizationLink, errorLink, httpLink])

  return new ApolloClient({cache, link})
}

const parseSurveyIdFromUrl = () => {
  const hashFragments = document.location.hash.split("/")
  return hashFragments.length >= 3 && hashFragments[1] === "survey" ? hashFragments[2] : null
}

const init = () => {
  const reduxStore = createReduxStore(parseSurveyIdFromUrl())
  const apolloClient = createApolloClient(reduxStore)

  initLucaI18n()
  initSurveyEventQueue(createBackendEventUpdater(apolloClient), 2000)

  const rootComponent = (
    <Provider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <Global styles={globalStyle} />
        <App />
        <AppNotificationContainer />
        <div id="portal-root" />
      </ApolloProvider>
    </Provider>
  )

  const rootElement = document.createElement("div")
  rootElement.id = "root"
  document.body.appendChild(rootElement)
  const container = document.getElementById("root")
  const root = createRoot(container!) // createRoot(container!) if you use TypeScript
  root.render(rootComponent)
}

init()
