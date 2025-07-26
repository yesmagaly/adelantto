import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

import { applicationsApi } from "./services/applications";
import { authApi } from "./services/auth";
import { generalApi } from "./services/general";
import { loansApi } from "./services/loans";
import { userApi } from "./services/users";

import { authSlice } from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { articlesApi } from "./services/articles";

const { routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const RTKState = {
  auth: authSlice.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [generalApi.reducerPath]: generalApi.reducer,
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

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(routerMiddleware)
      .concat(applicationsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(authApi.middleware)
      .concat(generalApi.middleware)
      .concat(loansApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);
