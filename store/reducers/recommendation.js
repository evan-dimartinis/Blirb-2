import { REC_TO_MODAL } from "../actions/types";
import { LOGOUT } from '../auth/authActions';

const initialState = {
  rec: null,
};

const RecReducer = (state = initialState, action) => {
  switch (action.type) {
    case REC_TO_MODAL:
      return {
        rec: action.data,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default RecReducer;
