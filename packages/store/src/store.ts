import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import { userApi } from "./services/users";

const { routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const RTKState = {
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
        .concat(userApi.middleware),
  });

export const store = createStore();
