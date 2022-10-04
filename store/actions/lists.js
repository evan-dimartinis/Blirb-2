import { GET_USER_LISTS } from "./types";

export const createList = (listName) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&nameOfRankings=${listName}&endpoint=createlist/`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        const resData = await response.json();
        throw new Error("http error creating new list");
      } else {
        const resData = await response.json();
      }
    } catch (err) {
      throw new Error("could not create list");
    }
  };
};

export const addPodcastEpisodeToList = (podcastID, episodeID, listID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&podcastID=${podcastID}&episodeID=${episodeID}&rankingList=${listID}`
      );
      const resData = await response.json();
    } catch (err) {
      throw new Error("Could not add podcast episode to list");
    }
  };
};

export const addBookToList = (bookID, listID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&bookID=${bookID}&rankingList=${listID}`,
        {
          method: "POST",
        }
      );
    } catch (err) {
      throw new Error("Could not add book to list")
    }
  };
};

export const addTvShowToList = (showID, listID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&tvShowID=${showID}&rankingList=${listID}`,
        {
          method: "POST",
        }
      );
    } catch (err) {
      throw new Error("Could not add tv show to list");
    }
  };
};

export const addPodcastToList = (podcastID, listID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&podcastID=${podcastID}&rankingList=${listID}`,
        {
          method: "POST",
        }
      );
    } catch (err) {
      throw new Error("Could not add movie to list");
    }
  };
};

export const getUserLists = () => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=currentuser/lists/`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Cannot get user lists");
      } else {
        const resData = await response.json();
        let lists = [];
        resData.forEach((list) => {
          lists.push({
            name: list.nameOfRankings,
            id: list.rankingsID,
          });
        });
        dispatch({
          type: GET_USER_LISTS,
          data: lists,
        });
      }
    } catch (err) {
      throw new Error("Could not load group lists");
    }
  };
};

export const addMovieToList = (recID, listID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&movieID=${recID}&rankingList=${listID}`,
        {
          method: "POST",
        }
      );
      const ResData = await response.json();
    } catch (err) {
      throw new Error("Could not add movie to list");
    }
  };
};

export const searchAddToList = (lists, mediaID, mediaType, podcastID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      if (mediaType === "movie") {
        lists.forEach(async (list) => {
          let listID = list.id;
          let response = await fetch(
            `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&movieIDX=${mediaID}&rankingList=${listID}`,
            {
              method: "POST",
            }
          );
          const resData = await response.json();
        });
      } else if (mediaType === "tv") {
        lists.forEach(async (list) => {
          let listID = list.id;
          let response = await fetch(
            `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&tvShowIDX=${mediaID}&rankingList=${listID}`,
            {
              method: "POST",
            }
          );
          const resData = await response.json();
        });
      } else if (mediaType === "book") {
        lists.forEach(async (list) => {
          let listID = list.id;
          let response = await fetch(
            `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&bookIDX=${mediaID}&rankingList=${listID}`,
            {
              method: "POST",
            }
          );
          const resData = await response.json();
        });
      } else if (mediaType === "podcast") {
        lists.forEach(async (list) => {
          let listID = list.id;
          let response = await fetch(
            `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&podcastIDX=${mediaID}&rankingList=${listID}`,
            {
              method: "POST",
            }
          );
          const resData = await response.json();
        });
      } else if (mediaType === "podcast-ep") {
        lists.forEach(async (list) => {
          let listID = list.id;
          let response = await fetch(
            `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=additemtolist/&podcastIDX=${podcastID}&episodeIDX=${mediaID}&rankingList=${listID}`,
            {
              method: "POST",
            }
          );
          const resData = await response.json();
        });
      }
    } catch (err) {
      throw new Error("could not add media to list");
    }
  };
};

export const removeFromList = (itemID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=DELETE&endpoint=listitems/${itemID}/update/`,
        {
          method: "DELETE"
        }
      )
      const resData = await response.json()
    } catch (err) {
      throw new Error("Could not remove item from list")
    }
  }
}
