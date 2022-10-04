import { LOGIN, LOGOUT } from "./authActions";
import { AsyncStorage } from 'react-native';

const initialUserState = {
  user: {
    username: null,
    FirstName: null,
    LastName: null,
    email: null,
    token: null,
    token_expiration: null,
    isAuth: false,
  },
};

const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: {
          username: action.data.username,
          FirstName: action.data.firstname,
          LastName: action.data.lastname,
          email: null,
          token: action.data.token,
          token_expiration: null,
          isAuth: true,
        },
      };
    case LOGOUT:
      return initialUserState
    default:
        return state;
  }
};

export default authReducer;
