import { postActivityImage } from './../../../api/activities';

import constants from './../constants';

export const setActivityList = ({ list }) => {
  return {
    type: constants.SET_ACTIVITY_LIST,
    list,
  };
};

const postImageStart = () => {
  return {
    type: constants.POST_IMAGE_START,
  };
};

const postImageSuccess = (data) => {
  return {
    type: constants.POST_IMAGE_SUCCESS,
    ...data,
  };
};

const postImageFail = () => {
  return {
    type: constants.POST_IMAGE_FAIL,
  };
};

export const postImage = (activityId, data) => {
  return dispatch => {
    dispatch(postImageStart());

    postActivityImage(data)
      .then(response => {
        dispatch(postImageSuccess({ activityId, image: response.data.data }));
      })
      .catch(ex => {
        console.log('Failed to post activity image', ex);

        dispatch(postImageFail());
      });
  };
};
