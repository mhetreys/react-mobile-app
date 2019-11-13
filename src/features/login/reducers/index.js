import constants from './../constants';

const initialState = {
};

const loginData = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_START:
      return { ...state, isLoading: true };

    case constants.LOGIN_SUCCESS:
      return { ...state, user: action.data, isLoading: false };

    case constants.LOGIN_FAIL:
      return { ...state, isLoading: false };
  }

  return state;
};

export default loginData;
