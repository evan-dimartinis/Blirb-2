import { GET_COMMENTS } from '../actions/types';
import { LOGOUT } from '../auth/authActions';

const initialState = {
    comments: []
}

const CommentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COMMENTS:
        return {
          comments: action.data
        };
      case LOGOUT:
        return initialState
      default:
        return state;
    }
  };

export default CommentsReducer;