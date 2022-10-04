import { GET_USER_LISTS } from "../actions/types";
import { LOGOUT } from '../auth/authActions';

const initialState = {
  lists: [],
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LISTS:
      return {
        lists: action.data,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default ListReducer;
