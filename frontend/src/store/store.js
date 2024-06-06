import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from 'reduxjs/toolkit';

const rootReducer = combineReducers({
  // Add reducers here
});

const middleware = [thunk];

const store = configureStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
