import thunk from "redux-thunk";

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from "../reducers/authReducer";
import guessReducer from "../reducers/guessReducer";
import matchReducer from "../reducers/matchReducer";
import notificationReducer from "../reducers/notificationReducer";
import teamReducer from "../reducers/teamReducer";
import usersReducer from "../reducers/usersReducer";

const reducer = combineReducers({
  auth: authReducer,
  guesses: guessReducer,
  matches: matchReducer,
  notification: notificationReducer,
  teams: teamReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store