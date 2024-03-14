import paymentStore from "./paymentStore";

import { combineReducers } from "redux";

const reducers = combineReducers(
    { paymentStore }
);

export default reducers;
