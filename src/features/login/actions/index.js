import { postLogin } from './../../../api/login';
import { setAuthorizationHeader } from './../../../api/instance';
import constants from './../constants';

import utils from './../../../utils';

export const loginStart = () => {
  return {
    type: constants.LOGIN_START,
  };
};

export const loginSuccess = (data) => {
  // Save user info in phone storage
  utils.storeData(constants.USER_INFO_KEY, JSON.stringify(data));

  // Set auth token for subsequent requests
  setAuthorizationHeader(data.token);

  return {
    type: constants.LOGIN_SUCCESS,
    data,
  };
};

export const loginFail = () => {
  return {
    type: constants.LOGIN_FAIL,
  };
};

export const doLogin = credentials => {
  return dispatch => {
    dispatch(loginStart());

    postLogin(credentials)
      .then(response => {
        dispatch(loginSuccess(response.data));
      })
      .catch(ex => {
        dispatch(loginFail());
      });
  };
};
