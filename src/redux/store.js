import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { drinksReducer } from './reducers/drinks';

const rootReducer = combineReducers({
  drinks: drinksReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);