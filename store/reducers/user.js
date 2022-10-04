import { GET_CURRENT_USER_PIC, GET_USER_INFO } from "../actions/types";
import { LOGOUT } from '../auth/authActions';

const initialState = {
  email: "",
  first_name: "",
  last_name: "",
  id: "",
  username: "",
  S3Key: "https://d3cemh7k7c204q.cloudfront.net/general/default.png",
  lists: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        email: action.data.email,
        first_name: action.data.first_name,
        last_name: action.data.last_name,
        username: action.data.username,
        id: action.data.id,
        S3Key: action.S3Key,
        lists: action.lists,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
