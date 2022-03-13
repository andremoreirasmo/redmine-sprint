import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { useDispatch } from 'react-redux';
import { createReduxHistoryContext } from 'redux-first-history';
import appReducer from './app.store';
import authReducer from './auth.store';
import redmineReducer from './redmine.store';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  app: appReducer,
  redmine: redmineReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
