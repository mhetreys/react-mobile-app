import constants from './../constants';

const initialState = {
  commentsBySupplier: {},
};

const commentData = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_COMMENT_LIST_START:
      return { ...state, isLoading: true };

    case constants.GET_COMMENT_LIST_SUCCESS:
    const supplierComments = Object.keys(action.comments).map(key => action.comments[key]).reduce((acc, array) => acc.concat(array), []);
      return {
        ...state,
        isLoading: false,
        commentsBySupplier: { ...state.commentsBySupplier, [action.supplierId]: supplierComments }
      };

    case constants.GET_COMMENT_LIST_FAIL:
      return { ...state, isLoading: false };

    case constants.POST_COMMENT_START:
      return { ...state, postSuccess: false, postError: false };

    case constants.POST_COMMENT_SUCCESS:
      const newCommentsForSupplier = [
        ...state.commentsBySupplier[action.proposal_id],
        {
          comment: action.comment,
          shortlisted_spaces_id: action.shortlisted_space_id,
          timestamp: Date.now(),
          related_to: action.related_to,
        },
      ];

      return {
        ...state,
        postSuccess: true,
        postError: false,
        commentsBySupplier: { ...state.commentsBySupplier, [action.proposal_id]: newCommentsForSupplier }
      };

    case constants.POST_COMMENT_FAIL:
      return { ...state, postSuccess: false, postError: true };
  }

  return state;
};

export default commentData;
