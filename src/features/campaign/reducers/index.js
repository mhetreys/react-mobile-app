import constants from './../constants';
import supplierConstants from './../../suppliers/constants';

const initialState = {
  selectedCampaign: {},
  assignedCampaigns: [],
};

const campaignData = (state = initialState, action) => {
  switch (action.type) {
  	case constants.GET_CAMPAIGN_LIST_START:
      return { ...state, isLoading: true, getFail: false, getSuccess: false };

    case constants.GET_CAMPAIGN_LIST_SUCCESS:
      return {
      	...state,
      	isLoading: false,
        campaignsList: action.data,
        getSuccess: true,
        getFail: false,
      };

    case constants.GET_CAMPAIGN_LIST_FAIL:
      return { ...state, isLoading: false, getFail: true, getSuccess: false };

    case supplierConstants.GET_SUPPLIERS_LIST_SUCCESS:
      const suppliers = action.data.shortlisted_suppliers || [];
      return {
        ...state,
        assignedCampaigns: suppliers.map(item => item.proposal_id),
      };

    case constants.SET_SELECTED_CAMPAIGN:
      return { ...state, selectedCampaign: { ...action.campaign } };
  }

  return state;
};

export default campaignData;
