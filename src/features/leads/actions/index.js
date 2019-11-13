import moment from 'moment';

import { getLeadsList, getExtraLeadsList, postExtraLeadsData } from './../../../api/leads';
import constants from './../constants';

const getLeadsListStart = () => {
  return {
    type: constants.GET_LEADS_LIST_START,
  };
};

const getLeadsListSuccess = (data) => {
  return {
    type: constants.GET_LEADS_LIST_SUCCESS,
    data,
  };
};

const getLeadsListFail = () => {
  return {
    type: constants.GET_LEADS_LIST_FAIL,
  };
};

export const getLeads = ({ campaignId }) => {
  return dispatch => {
    dispatch(getLeadsListStart());

    getLeadsList({ campaignId })
      .then(response => {
        dispatch(getLeadsListSuccess(response.data.data));
      })
      .catch(ex => {
        console.log('Failed to get list of Leads', ex);

        dispatch(getLeadsListFail());
      });
  };
};

const getExtraLeadsListStart = () => {
  return {
    type: constants.GET_EXTRA_LEADS_LIST_START,
  };
};

const getExtraLeadsListSuccess = (data) => {
  return {
    type: constants.GET_EXTRA_LEADS_LIST_SUCCESS,
    data,
  };
};

const getExtraLeadsListFail = () => {
  return {
    type: constants.GET_EXTRA_LEADS_LIST_FAIL,
  };
};

export const getExtraLeads = ({ campaignId, supplierId, leads_form_id }) => {
  return dispatch => {
    dispatch(getExtraLeadsListStart());

    getExtraLeadsList({ campaignId, supplierId, leads_form_id})
      .then(response => {
        dispatch(getExtraLeadsListSuccess(response.data.data));
      })
      .catch(ex => {
        console.log('Failed to get list of Leads', ex);

        dispatch(getExtraLeadsListFail());
      });
  };
}

const postExtraLeadsStart = () => {
  return {
    type: constants.POST_EXTRA_LEADS_START,
  };
};

const postExtraLeadsSuccess = (data) => {
  return {
    type: constants.POST_EXTRA_LEADS_SUCCESS,
    data,
  };
};

const postExtraLeadsFail = () => {
  return {
    type: constants.POST_EXTRA_LEADS_FAIL,
  };
};

export const postExtraLeads = ({leadsData, leads_form_id}) => {
  return dispatch => {
    dispatch(postExtraLeadsStart());

    postExtraLeadsData({leadsData, leads_form_id})
      .then(response => {
        dispatch(postExtraLeadsSuccess(response.data.data));
      })
      .catch(ex => {
        console.log('Failed to get list of Leads', ex);

        dispatch(postExtraLeadsFail());
      });
  };
}
