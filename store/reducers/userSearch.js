import { SEARCH_USERS } from "../actions/types";
import { LOGOUT } from '../auth/authActions';

const initialState = {
  results: [],
};

export const UserSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        results: action.data,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default UserSearchReducer;
