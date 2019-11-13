import constants from './../constants';

const initialState = {
  activityList: [],
};

const activityData = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_ACTIVITY_LIST:
      return {
        ...state,
        activityList: action.list,
      };

    case constants.POST_IMAGE_START:
      return { ...state, postImageSuccess: false, postImageError: false };

    case constants.POST_IMAGE_SUCCESS:
      const activityList = [...state.activityList];
      for (let i = 0, l = activityList.length; i < l; i += 1) {
        if (activityList[i].activity_id === action.activityId) {
          activityList[i].images.push({ image_path: action.image });
        }
      }
      return {
        ...state,
        activityList,
        postImageSuccess: true,
        postImageError: false,
      };

    case constants.POST_IMAGE_FAIL:
      return { ...state, postImageSuccess: false, postImageError: true };
  }

  return state;
};

export default activityData;
