import constants from './../constants';
import campaignConstants from './../../campaign/constants';

const initialState = {
  selectedSupplier: {},
  suppliersByCampaignId: {},
};

const suppliersData = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_SUPPLIERS_LIST_START:
      return {
        ...state,
        isLoading: true,
        getListSuccess: false,
        getListError: false,
      };

    case constants.GET_SUPPLIERS_LIST_SUCCESS:
      return {
        ...state,
        suppliersList: action.data.shortlisted_suppliers,
        isLoading: false,
        getListSuccess: true,
      };

    case constants.GET_SUPPLIERS_LIST_FAIL:
      return { ...state, isLoading: false, getListError: true };

    case constants.GET_SUPPLIERS_BY_CAMPAIGN_START:
      return { ...state, isLoading: true };

    case constants.GET_SUPPLIERS_BY_CAMPAIGN_SUCCESS:
      return {
        ...state,
        suppliersByCampaignId: {
          ...state.suppliersByCampaignId,
          [action.campaignId]: action.data,
        },
        isLoading: false,
        selectedSupplier: action.clearSelectedSupplier ? {} : selectedSupplier,
      };

    case constants.GET_SUPPLIERS_BY_CAMPAIGN_FAIL:
      return { ...state, isLoading: false };

    case constants.SET_SELECTED_SUPPLIER:
      return { ...state, selectedSupplier: { ...action.supplier } };

    case campaignConstants.SET_SELECTED_CAMPAIGN:
      return { ...state, selectedSupplier: {} };

    case constants.POST_HASHTAG_START:
      return { ...state, postHashtagSuccess: false, postHashtagError: false };

    case constants.POST_HASHTAG_SUCCESS:
      return {
        ...state,
        postHashtagSuccess: true,
        postHashtagError: false,
      };

    case constants.POST_HASHTAG_FAIL:
      return { ...state, postHashtagSuccess: false, postHashtagError: true };
  }

  return state;
};

export default suppliersData;
