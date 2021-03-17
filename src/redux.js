import reducer from "services/reducers";

import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

const middleware =
  process.env.NODE_ENV !== "production" ? [thunk, logger] : [thunk];
export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
