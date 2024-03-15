import paymentStore from "./paymentStore";
import theme from "./theme";

import { combineReducers } from "redux";

const reducers = combineReducers(
    {
        paymentStore,
        theme,
    }
);

export default reducers;
