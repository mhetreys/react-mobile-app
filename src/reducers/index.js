import { combineReducers } from "redux";
import loginData from "./../features/login/reducers";
import activityData from "./../features/activities/reducers";
import suppliersData from "./../features/suppliers/reducers";
import commentData from "./../features/suppliers/reducers/comment";
import leadData from "./../features/leads/reducers";
import campaignData from "./../features/campaign/reducers";

const appReducer = combineReducers({
  loginData,
  activityData,
  suppliersData,
  commentData,
  leadData,
  campaignData
});

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
