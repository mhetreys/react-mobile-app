import axios from 'axios';

import constants from './constants';
import loginConstants from './../features/login/constants';
import utils from './../utils';

// const getToken = () => {
//   try {
//     const userInfo = JSON.parse(utils.retrieveData(loginConstants.USER_INFO_KEY));
    
//     return userInfo.token;
//   } catch (ex) {
//     console.log('User info not available yet');
//   }

//   return '';
// };

export const authorized = axios.create({
  baseURL: constants.API_URL,
  timeout: (2 * 60 * 1000), // 2 mins
  headers: {},
});

export const setAuthorizationHeader = (token) => {
  authorized.defaults.headers.common['Authorization'] = 'JWT '.concat(token);
};


export const unauthorized = axios.create({
  baseURL: constants.API_URL,
  timeout: (2 * 60 * 1000), // 2 mins
  headers: {},
});
