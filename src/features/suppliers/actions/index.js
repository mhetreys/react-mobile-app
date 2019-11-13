import {
  getSuppliersList,
  getComment,
  postCommentData,
  getSupplierByCampaignList,
  postSuppliersHashtag
} from './../../../api/suppliers';

import constants from './../constants';

import utils from './../../../utils';

const getSuppliersListStart = () => {
  return {
    type: constants.GET_SUPPLIERS_LIST_START,
  };
};

const getSuppliersListSuccess = (data) => {
  return {
    type: constants.GET_SUPPLIERS_LIST_SUCCESS,
    data,
  };
};

const getSuppliersListFail = () => {
  return {
    type: constants.GET_SUPPLIERS_LIST_FAIL,
  };
};

export const getSuppliers = () => {
  return (dispatch, getState) => {
    const { user } = getState().loginData;
    dispatch(getSuppliersListStart());

    getSuppliersList(user)
      .then(response => {
        dispatch(getSuppliersListSuccess(response.data.data));
      })
      .catch(ex => {
        console.log('Failed to get list of Suppliers', ex);

        dispatch(getSuppliersListFail());
      });
  };
};

const getSupplierByCampaignStart = () => {
  return {
    type: constants.GET_SUPPLIERS_BY_CAMPAIGN_START,
  };
};

const getSupplierByCampaignSuccess = async (campaignId, data) => {
  // Remove selected supplier if selected supplier is not available in received list of suppliers
  let clearSelectedSupplier = false;
  try {
    let supplier = await utils.retrieveData(
      constants.SELECTED_SUPPLIER_KEY,
    );
    supplier = JSON.parse(supplier);

    if (data.findIndex((item) => {item.supplier_id === supplier.supplier_id}) === -1) {
      utils.removeData(constants.SELECTED_SUPPLIER_KEY);
      clearSelectedSupplier = true;
    }
  } catch (ex) {
    console.log('No supplier selected');
  }

  return {
    type: constants.GET_SUPPLIERS_BY_CAMPAIGN_SUCCESS,
    campaignId,
    data,
    clearSelectedSupplier,
  };
};

const getSupplierByCampaignFail = () => {
  return {
    type: constants.GET_SUPPLIERS_BY_CAMPAIGN_FAIL,
  };
};

export const getSupplierByCampaign = ({ campaignId }) => {
  return dispatch => {
    dispatch(getSupplierByCampaignStart());

    getSupplierByCampaignList({ campaignId })
      .then(response => {
        dispatch(getSupplierByCampaignSuccess(campaignId, response.data.data));
      })
      .catch(ex => {
        console.log('Failed to get list of Suppliers', ex);

        dispatch(getSupplierByCampaignFail());
      });
  };
};

const setSelectedSupplierSuccess = ({ supplier }) => {
  return {
    type: constants.SET_SELECTED_SUPPLIER,
    supplier,
  };
};

export const setSelectedSupplier = ({ supplier }) => {
  // Save selected supplier in phone storage
  utils.storeData(constants.SELECTED_SUPPLIER_KEY, JSON.stringify(supplier));

  return dispatch => {
    dispatch(setSelectedSupplierSuccess({ supplier }));
  };
};

const getCommentListStart = () => {
  return {
    type: constants.GET_COMMENT_LIST_START,
  };
};

const getCommentListSuccess = (supplierId, comments) => {
  return {
    type: constants.GET_COMMENT_LIST_SUCCESS,
    supplierId,
    comments,
  };
};

const getCommentListFail = () => {
  return {
    type: constants.GET_COMMENT_LIST_FAIL,
  };
};

export const getCommentList = ({proposal_id, shortlisted_space_id}) => {
  return dispatch => {
    dispatch(getCommentListStart());

    getComment({ proposal_id, shortlisted_space_id, related_to: 'EXECUTION' })
      .then(response => {
        dispatch(getCommentListSuccess(proposal_id, response.data.data));
      })
      .catch(ex => {
        console.log('Failed to get list of Suppliers', ex);

        dispatch(getCommentListFail());
      });
  };
};

const postCommentStart = () => {
  return {
    type: constants.POST_COMMENT_START,
  };
};

const postCommentSuccess = (data) => {
  return {
    type: constants.POST_COMMENT_SUCCESS,
    ...data,
  };
};

const postCommentFail = () => {
  return {
    type: constants.POST_COMMENT_FAIL,
  };
};

export const postComment = ({ proposal_id, shortlisted_space_id, comment }) => {
  return dispatch => {
    dispatch(postCommentStart());
    const data = {
      comment,
      shortlisted_spaces_id: shortlisted_space_id,
      related_to: 'EXECUTION',
    };

    postCommentData({ proposal_id, data })
      .then(response => {
        dispatch(postCommentSuccess({ proposal_id, ...data }));
      })
      .catch(ex => {
        console.log('Failed to get list of Suppliers', ex);

        dispatch(postCommentFail());
      });
  };
};

const postHashtagStart = () => {
  return {
    type: constants.POST_HASHTAG_START,
  };
};

const postHashtagSuccess = (data) => {
  return {
    type: constants.POST_HASHTAG_SUCCESS,
    data,
  };
};

const postHashtagFail = () => {
  return {
    type: constants.POST_HASHTAG_FAIL,
  };
};

export const postHashtag = (data) => {
  return dispatch => {
    dispatch(postHashtagStart());

    postSuppliersHashtag(data)
      .then(response => {
        dispatch(postHashtagSuccess(response.data.data));
      })
      .catch(ex => {
        console.log('Failed to post hashtag', ex);

        dispatch(postHashtagFail());
      });
  };
};

