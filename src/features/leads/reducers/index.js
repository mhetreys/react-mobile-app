import constants from './../constants';

const initialState = {
  extraLeadsList: [],
};

const leadData = (state = initialState, action) => {
  switch (action.type) {
  	case constants.GET_LEADS_LIST_START:
      return { ...state, isLoading: true };

    case constants.GET_LEADS_LIST_SUCCESS:
      return {
      	...state,
      	isLoading: false,
        leadsList: action.data,
      };

    case constants.GET_LEADS_LIST_FAIL:
      return { ...state, isLoading: false };

    case constants.GET_EXTRA_LEADS_LIST_START:
      return { ...state, isExtraLeadsLoading: true };

    case constants.GET_EXTRA_LEADS_LIST_SUCCESS:
      return {
        ...state,
        isExtraLeadsLoading: false,
        extraLeadsList: action.data,
      };

    case constants.GET_EXTRA_LEADS_LIST_FAIL:
      return { ...state, isExtraLeadsLoading: false, extraLeadsList: [] };

    case constants.POST_EXTRA_LEADS_START:
      return { ...state, postSuccess: false, postError: false };

    case constants.POST_EXTRA_LEADS_SUCCESS:
      return {
        ...state,
        postSuccess: true,
        postError: false,
      };

    case constants.POST_EXTRA_LEADS_FAIL:
      return { ...state, postSuccess: false, postError: true};
  }

  return state;
};

export default leadData;
