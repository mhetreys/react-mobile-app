import utils from './../../../utils';

export const doLogout = () => {
  return dispatch => {
    // Clear all data from async storage
    utils.clearData();

    // Trigger action to create all reducers
    dispatch({
      type: 'LOGOUT',
    });
  };
};
