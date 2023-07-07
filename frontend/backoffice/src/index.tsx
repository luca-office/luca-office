import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client"
import {onError} from "@apollo/client/link/error"
import createCache from "@emotion/cache"
import {CacheProvider, EmotionCache, Global} from "@emotion/react"
import {GraphQLError} from "graphql"
import {createHashHistory} from "history"
import * as React from "react"
import {createRoot} from "react-dom/client"
import "regenerator-runtime/runtime.js"
import "react-tooltip/dist/react-tooltip.css"
import {Provider} from "react-redux"
import {applyMiddleware, createStore, Store} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {connectRoutes} from "redux-first-router"
import thunk from "redux-thunk"
import {NotificationSeverity} from "shared/enums"
import {AppNotification} from "shared/models"
import {globalStyle} from "shared/styles"
import {initLucaI18n} from "shared/translations/luca-i18next"
import {Option} from "shared/utils"
import {isSpecificError, LucaErrorType, mapErrorToNotification} from "shared/utils/errors"
import {AppContainer, AppNotificationContainer} from "./modules"
import {updateNotification} from "./redux/actions/ui/common-ui-action"
import {appReducer} from "./redux/reducers/app-reducer"
import {AppState, initialAppState} from "./redux/state/app-state"
import {routesMap} from "./routes"

export const createReduxStore = () => {
  const options = {createHistory: createHashHistory}
  const {reducer: locationReducer, middleware: routerMiddleware, enhancer} = connectRoutes(routesMap, options)
  const middlewares = applyMiddleware(routerMiddleware, thunk)
  // TODO 2757
  const enhancers = composeWithDevTools<any, any>(enhancer as any, middlewares)

  return createStore(appReducer(locationReducer), initialAppState, enhancers)
}

const createApolloClient = (reduxStore: Store<AppState>) => {
  const cache = new InMemoryCache()
  const httpLink = new HttpLink({uri: "/backend/graphql", credentials: "same-origin"})
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error: GraphQLError) => {
        const {message, locations, path, extensions} = error
        console.log("Graphql error: ", message, "at location", locations, path, extensions)

        if (message.indexOf("Unauthorized") === -1 && !isSpecificError(extensions?.type as LucaErrorType)) {
          reduxStore.dispatch(updateNotification(Option.of(mapErrorToNotification(LucaErrorType.GeneralError))))
        }
      })
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)

      if (networkError.message.indexOf("401") !== -1) {
        reduxStore.dispatch(
          updateNotification(
            Option.of({
              severity: NotificationSeverity.Error,
              messageKey: "notification__message_unauthorized"
            } as AppNotification)
          )
        )
      } else {
        reduxStore.dispatch(
          updateNotification(
            Option.of({
              severity: NotificationSeverity.Error,
              messageKey: "notification__message_graphql_error"
            } as AppNotification)
          )
        )
      }
    }
  })
  const link = ApolloLink.from([errorLink, httpLink])

  return new ApolloClient({cache, link})
}

const createEmotionCache = () =>
  createCache({
    prefix: key => {
      switch (key) {
        // prevent placeholder prefixing for ie, which causes the app to crash
        // (::placeholder is not supported by ie)
        case ":placeholder":
          return false
        default:
          return true
      }
    }
  })

const init = () => {
  initLucaI18n()

  const reduxStore = createReduxStore()
  const apolloClient = createApolloClient(reduxStore)
  const emotionCache = createEmotionCache()

  const rootComponent = (
    <Provider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        {/*TODO: update @emotion/cache as soon as an update is available to prevent type mismatch (EmotionCache) with @emotion/react*/}
        <CacheProvider value={emotionCache as unknown as EmotionCache}>
          <Global styles={globalStyle} />
          <AppContainer />
          <AppNotificationContainer />
        </CacheProvider>
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
