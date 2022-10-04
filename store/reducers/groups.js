import { GET_USER_GROUPS, SET_ACTIVE_GROUP } from "../actions/types";
import { LOGOUT } from '../auth/authActions';


const initialState = {
    groupList: [],
    activeGroup: {
      name: "",
      id: null
    }
}

const GroupsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ACTIVE_GROUP:
        return {
          groupList: state.groupList,
          activeGroup: action.data
        }
      case GET_USER_GROUPS:
        return {
          groupList: action.data,
          activeGroup: state.activeGroup
        };
      case LOGOUT:
        return initialState
      default:
        return state;
    }
  };

export default GroupsReducer;