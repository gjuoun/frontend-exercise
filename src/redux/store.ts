import { createStore } from 'redux'
import rootReducer from "./reducers"
import { env } from '@config/environment'

let reduxExtension = undefined;

// enable redux chrome extension
if (env.redux.enableChromeExtension
  && window.__REDUX_DEVTOOLS_EXTENSION__) {

  reduxExtension = window.__REDUX_DEVTOOLS_EXTENSION__()
}

export const store = createStore(
  rootReducer,
  reduxExtension
)