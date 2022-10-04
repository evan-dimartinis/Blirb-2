import { SET_PODCAST_ID } from "../actions/types";
import { LOGOUT } from '../auth/authActions';

const initialState = {
  podcastID: null,
};

const PodcastIDReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PODCAST_ID:
      return {
        podcastID: action.data,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default PodcastIDReducer;
