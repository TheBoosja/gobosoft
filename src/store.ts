import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {composeWithDevTools} from "@reduxjs/toolkit/dist/devtoolsExtension"
import {createBrowserHistory} from "history"
import {createReduxHistoryContext} from "redux-first-history"
import reducers from "./ducks/reducers"

const {createReduxHistory, routerMiddleware, routerReducer} = createReduxHistoryContext({
  history: createBrowserHistory()
})

export const store = configureStore({
  reducer: {
    router: routerReducer,
    ...reducers
  },
  middleware: [
    routerMiddleware
  ],
})

export const history = createReduxHistory(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

