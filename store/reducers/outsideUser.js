import { GET_USER_LISTS_BY_ID } from "../actions/types";
import { LOGOUT } from '../auth/authActions';

const initialState = {
  lists: [],
  info: {
    first_name: "",
    id: 0,
    last_name: "",
    username: "",
  },
  S3Key: "https://d3cemh7k7c204q.cloudfront.net/general/default.png",
};

const outsideUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LISTS_BY_ID:
      return {
        lists: action.lists,
        info: action.info,
        S3Key: action.S3Key,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default outsideUserReducer;
