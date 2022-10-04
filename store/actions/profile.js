import { CHANGE_PROFILE_PICTURE } from "./types";

export const changeProfilePicture = (file) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=user-management/currentuser/photoupload&fileName=${file.name}`
      );
      const resData = await response.json();
      let response2 = await fetch(
        'https://dbgtjb94040g6.cloudfront.net/'+ resData.S3Key,
        {
            method: "PUT",
            body: file
        }
      )
    } catch (error) {
        throw new Error("Could not upload photo")
    }
  };
};
