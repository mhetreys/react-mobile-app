import { getCampaignList } from './../../../api/campaign';
import constants from './../constants';

import utils from './../../../utils';

const getCampaignListStart = () => {
  return {
    type: constants.GET_CAMPAIGN_LIST_START,
  };
};

const getCampaignListSuccess = (data) => {
  return {
    type: constants.GET_CAMPAIGN_LIST_SUCCESS,
    data,
  };
};

const getCampaignListFail = () => {
  return {
    type: constants.GET_CAMPAIGN_LIST_FAIL,
  };
};

export const getCampaigns = () => {
  return dispatch => {
    dispatch(getCampaignListStart());

    getCampaignList()
      .then(response => {
        dispatch(getCampaignListSuccess(response.data.data));
      })
      .catch(ex => {
        console.log('Failed to get list of Campaigns', ex);

        dispatch(getCampaignListFail());
      });
  };
};

const setSelectedCampaignSuccess = ({ campaign }) => {
  return {
    type: constants.SET_SELECTED_CAMPAIGN,
    campaign,
  };
};

export const setSelectedCampaign = ({ campaign }) => {
  // Save selected campaign in phone storage
  utils.storeData(constants.SELECTED_CAMPAIGN_KEY, JSON.stringify(campaign));

  return dispatch => {
    dispatch(setSelectedCampaignSuccess({ campaign }));
  };
};
