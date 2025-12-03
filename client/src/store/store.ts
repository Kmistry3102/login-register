import rootSaga from "./rootSaga";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (g) => g({ thunk: false }).concat(saga),
});

saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
