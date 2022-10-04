import { SUBMIT_COMMENT, UPDATE_COMMENTS, GET_COMMENTS } from "./types";

export const getComments = (recID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=movierecsingroups/${recID}/comments2`,
        {
          method: "GET",
        }
      );
      const resData = await response.json();
      dispatch({
          type: GET_COMMENTS,
          data: resData
      })
    } catch (err) {
      throw new Error("http error");
    }
  };
};

export const submitComment = (commentBody, groupRecID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&commentBody=${commentBody}&postID=${groupRecID}&endpoint=commentonmovierec/`,
        {
          method: "GET",
        }
      );
      const resData = await response.json();
    } catch (err) {
      throw new Error("Could not submit comment");
    } finally {
      let updateResponse = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=movierecsingroups/${groupRecID}/comments`,
        {
          method: "GET",
        }
      );
      let updateData = await updateResponse.json();
    }
  };
};

export const replyToComment = (groupRecID, parentID, commentBody) => {
    return async (dispatch, getState) => {
        const token = getState().authReducer.user.token;
        try {
            let response = await fetch(
                `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&postID=${groupRecID}&commentBody=${commentBody}&commentResponseID=${parentID}&endpoint=commentonmovierec/`,
            )
            const resData = await response.json()
        } catch (err) {
            throw new Error("Error replying to comment")
        }
    }
}
