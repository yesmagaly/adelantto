import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

import { applicationsApi } from "./services/applications";
import { calculatorApi } from "./services/calculator";
import { loansApi } from "./services/loans";
import { userApi } from "./services/users";

const { routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const RTKState = {
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  [calculatorApi.reducerPath]: calculatorApi.reducer,
  [loansApi.reducerPath]: loansApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};

const combined = combineReducers({
  ...RTKState,
  router: routerReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === `authentication/logOutUser`) {
    state = undefined;
  }

  return combined(state, action);
};

const createStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    //@ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(routerMiddleware)
        .concat(applicationsApi.middleware)
        .concat(calculatorApi.middleware)
        .concat(loansApi.middleware)
        .concat(userApi.middleware),
  });

export const store = createStore();
