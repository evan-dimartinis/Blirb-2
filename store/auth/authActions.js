export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

import { AsyncStorage } from "react-native";

export const log_out = () => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const autoLogin = (token, username) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN,
      data: {
        username: username,
        token: token,
        firstname: "firstname",
        lastname: "lastname",
      },
    });
  };
};

export const signup = (
  firstName,
  lastName,
  username,
  password,
  email,
  phoneNumber,
  signupCode
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/signup?username=${username}&password=${password}&phoneNumber=${phoneNumber}&email=${email}&signUpCode=${signupCode}&first_name=${firstName}&last_name=${lastName}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
    } else {
      const resData = await response.json();
      if (resData.Errors instanceof Array) {
        throw new Error("error signing up");
      }
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/signin?username=" +
        username +
        "&password=" +
        password,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    } else {
      const resData = await response.json();
      if (
        resData.Error !== undefined ||
        resData.Errors !== undefined ||
        resData.non_field_errors instanceof Array
      ) {
        throw new Error("error signing up");
      }
      AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          token: resData.token,
          username: username,
          password: password
        })
      );
      dispatch({
        type: LOGIN,
        data: {
          username: username,
          token: resData.token,
          firstname: "firstname",
          lastname: "lastname",
        },
      });
    }
  };
};

