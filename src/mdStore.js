import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

// Use logger only in development
let logger = createLogger({
  timestamps: true,
  duration: true
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
  // compose(applyMiddleware(thunk, logger)) // Note: Enable for development
);

export default store;
