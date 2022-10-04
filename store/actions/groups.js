import {
  GET_USER_GROUPS,
  GET_GROUP_FEED,
  UPDATE_GROUP_DETAILS,
  SET_ACTIVE_GROUP,
  UPDATE_GROUP_SETTINGS_GROUP,
  GET_PREVIOUS_GROUP_FEED,
  GET_NEXT_GROUP_FEED,
} from "./types";
import { Recommendation } from "../../models/recommendation.model";
import { AbbreviatedRecommendation } from "../../models/abbreviatedRecommendation";

export const getGroupRecComments = (recID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=movierecsingroups/${recID}/comments`,
        {
          method: "GET",
        }
      );
      const resData = await response.json();
    } catch (err) {
      throw new Error("Cannot get comments");
    }
  };
};

export const setActiveGroup = (groupID, groupName) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_GROUP,
      data: {
        name: groupName,
        id: groupID,
      },
    });
  };
};

export const addUserToGroup = (groupID, userID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=addmembertogroup/&groupID=${groupID}&userID=${userID}`
      );
      const resData = await response.json();
    } catch (err) {
      throw new Error("Could not add user to group")
    }
  };
};

export const updateGroupDetails = (groupName, groupDesc, groupID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=PATCH&endpoint=groupmanagement/${groupID}/update&groupName=${groupName}&groupDesc=${groupDesc}`,
        {
          method: "PATCH",
        }
      );
      const resData = await response.json();
      dispatch({
        type: UPDATE_GROUP_SETTINGS_GROUP,
        data: resData,
      });
    } catch (err) {
      throw new Error("Could not update group details");
    }
  };
};

export const uploadGroupPicture = (groupID, file) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=group-management/uploadphoto/&groupID=${groupID}&fileName=${file.fileName}`,
        {
          method: "POST",
          body: {
            groupID: groupID,
            fileName: file,
          },
        }
      );
      const resData = await response.json();
      try {
        let postResponse = await fetch(
          `https://dbgtjb94040g6.cloudfront.net/${resData.S3Key}`,
          {
            method: "PUT",
            body: file,
          }
        );
      } catch (error) {
        throw new Error("Could not upload picture");
      }
    } catch (err) {
      throw new Error("Could not upload picture");
    }
  };
};

export const createNewGroup = (groupName, groupDesc) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=groups/&groupName=${groupName}&groupDesc=${groupDesc}`,
        {
          method: "GET",
        }
      );
      const resData = await response.json();
      try {
        let joinResponse = await fetch(
          `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=joingroupbycode/&joinGroupCode=${resData.groupJoinCode}`,
          {
            method: "GET",
          }
        );
      } catch (err) {
        throw new Error();
      }
    } catch (err) {
      throw new Error();
    }
  };
};

export const removeMemberFromGroup = (groupID, userID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=DELETE&endpoint=groupmanagement/${groupID}/remove-member/${userID}`,
        {
          method: "DELETE",
        }
      );
      const resData = await response.json();
    } catch (err) {
      throw new Error("error removing group member");
    }
  };
};

export const setGroupSettingsGroup = (group) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_GROUP_SETTINGS_GROUP,
      data: group,
    });
  };
};

export const joinGroupByCode = (groupJoinCode) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=joingroupbycode/&joinGroupCode=${groupJoinCode}`,
        {
          method: "GET",
        }
      );
      let resData = await response.json();
    } catch (err) {
      throw new Error("Could not join group by code");
    }
  };
};

export const addMovieRecToGroup = (
  ID,
  recDescription,
  recRating,
  groupList,
  mediaType,
  podcastID
) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      let response = null;
      if (mediaType === "movie") {
        response = await fetch(
          `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=currentuser/recommendmovie/&movieID=${ID}&recommenderRating=${recRating}&recommendationDesc=${recDescription}`,
          {
            method: "GET",
          }
        );
      } else if (mediaType === "tv") {
        response = await fetch(
          `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=currentuser/recommendshow/&tvShowID=${ID}&recommenderRating=${recRating}&recommendationDesc=${recDescription}`,
          {
            method: "GET",
          }
        );
      } else if (mediaType === "book") {
        response = await fetch(
          `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=currentuser/recommendbook/&bookID=${ID}&recommenderRating=${recRating}&recommendationDesc=${recDescription}`,
          {
            method: "GET",
          }
        );
      } else if (mediaType === "podcast") {
        response = await fetch(
          `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=currentuser/recommendpodcast/&podcastID=${ID.toString()}&recommenderRating=${recRating}&recommendationDesc=${recDescription}`,
          {
            method: "GET",
          }
        );
      } else if (mediaType === "podcast-ep") {
        response = await fetch(
          `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=currentuser/recommendpodcastepisode/&podcastID=${podcastID.toString()}&episodeID=${ID}&recommenderRating=${recRating}&recommendationDesc=${recDescription}`,
          {
            method: "GET",
          }
        );
      }

      if (!response.ok) {
      } else {
        const recResData = await response.json();
        groupList.forEach((group) => {
          try {
            const groupResponse = fetch(
              `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=addmovierectogroup/&recID=${recResData.movieRecID.toString()}&groupID=${
                group.groupID
              }`,
              {
                method: "GET",
              }
            );
          } catch (err) {
            throw new Error("could not add rec to group");
          }
        });
      }
    } catch (err) {
      throw new Error("could not create new recommendation")
    }
  };
};

export const getUserGroups = () => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=currentuser/groups`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
    } else {
      const resData = await response.json();
      dispatch({
        type: GET_USER_GROUPS,
        data: resData,
      });
    }
    } catch (err) {
      throw new Error("could not get user groups")
    }
  };
};

export const getNextGroupFeed = (groupID, groupName, next) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    let nextLink = "";
    if (next) {
      nextLink = getState().mediaReducer.nextLink.substring(1);
    } else {
      nextLink = getState().mediaReducer.previousLinks[
        getState().mediaReducer.previousLinks.length - 1
      ];
    }
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=${nextLink}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
      } else {
        const resData = await response.json();

        const feed = [];
        resData.results.forEach((item) => {
          const new_rec = new AbbreviatedRecommendation(
            item.groupRecID,
            null,
            item.endorsements,
            item.createdAt,
            item.recID_id,
            item.recommendationDesc,
            item.recommenderRating,
            item.username,
            item.first_name + item.last_name,
            null,
            null,
            null,
            null,
            item.creatorUserID,
            null,
            null
          );
          if (
            item.podcastInfo !== undefined &&
            item.episodeInfo === undefined
          ) {
            new_rec.title = item.podcastInfo.title;
            new_rec.imageURL = item.podcastInfo.spotifyImageURL;
            new_rec.recType = "podcast";
            new_rec.description = item.podcastInfo.description;
            new_rec.externalURL = item.podcastInfo.spotifyURL;
            new_rec.mediaID = item.podcastID
          } else if (item.episodeInfo !== undefined) {
            new_rec.title = item.episodeInfo.name;
            new_rec.imageURL = item.episodeInfo.spotifyImageURL;
            new_rec.recType = "podcast-ep";
            new_rec.description = item.episodeInfo.description;
            new_rec.externalURL = item.episodeInfo.spotifyURL;
            new_rec.mediaID = item.episodeID
            new_rec.parentPodID = item.podcastID
          } else if (item.tvShowInfo !== undefined) {
            new_rec.title = item.tvShowInfo.showTitle;
            new_rec.recType = "tv";
            new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
              item.tvShowInfo.posterS3Key
            );
            new_rec.externalURL = item.tvShowInfo.imdb_link;
            new_rec.description = item.tvShowInfo.description;
            new_rec.mediaID = item.tvShowID
          } else if (item.movieInfo !== undefined) {
            new_rec.title = item.movieInfo.movieTitle;
            new_rec.recType = "movie";
            new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
              item.movieInfo.posterS3Key
            );
            new_rec.externalURL = item.movieInfo.imdb_link;
            new_rec.description = item.movieInfo.description;
            new_rec.mediaID = item.movieID
          } else if (item.bookInfo !== undefined) {
            new_rec.title = item.bookInfo[0].bookTitle;
            new_rec.imageURL = item.bookInfo[0].thumbnail;
            new_rec.recType = "book";
            new_rec.description = item.bookInfo[0].description;
            new_rec.mediaID = item.bookID
          }
          feed.push(new_rec);
        });
        if (next) {
          dispatch({
            type: GET_NEXT_GROUP_FEED,
            data: feed,
            next: resData.next,
            current: nextLink,
            name: groupName,
            id: groupID,
          });
        } else {
          dispatch({
            type: GET_PREVIOUS_GROUP_FEED,
            data: feed,
            next: resData.next,
            current: nextLink,
            name: groupName,
            id: groupID,
          });
          dispatch({
            type: SET_ACTIVE_GROUP,
            data: {
              name: groupName,
              id: groupID,
            },
          });
        }
      }
    } catch (err) {
      throw new Error("could not load next group feed");
    }
  };
};

export const getGroupFeed = (groupID, groupName) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=groups/${groupID}/feedlo`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
      } else {
        const resData = await response.json();
        const feed = [];
        resData.results.forEach((item) => {
          const new_rec = new AbbreviatedRecommendation(
            item.groupRecID,
            null,
            item.endorsements,
            item.createdAt,
            item.recID_id,
            item.recommendationDesc,
            item.recommenderRating,
            item.username,
            item.first_name + item.last_name,
            null,
            null,
            null,
            null,
            item.userID,
            null,
            null
          );
          if (
            item.podcastInfo !== undefined &&
            item.episodeInfo === undefined
          ) {
            new_rec.title = item.podcastInfo.title;
            new_rec.imageURL = item.podcastInfo.spotifyImageURL;
            new_rec.recType = "podcast";
            new_rec.description = item.podcastInfo.description;
            new_rec.externalURL = item.podcastInfo.spotifyURL;
            new_rec.mediaID = item.podcastID;
          } else if (item.episodeInfo !== undefined) {
            new_rec.title = item.episodeInfo.name;
            new_rec.imageURL = item.episodeInfo.spotifyImageURL;
            new_rec.recType = "podcast-ep";
            new_rec.description = item.episodeInfo.description;
            new_rec.externalURL = item.episodeInfo.spotifyURL;
            new_rec.mediaID = item.episodeID;
            new_rec.parentPodID = item.podcastID;
          } else if (item.tvShowInfo !== undefined) {
            new_rec.title = item.tvShowInfo.showTitle;
            new_rec.recType = "tv";
            new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
              item.tvShowInfo.posterS3Key
            );
            new_rec.externalURL = item.tvShowInfo.imdb_link;
            new_rec.description = item.tvShowInfo.description;
            new_rec.mediaID = item.tvShowID
          } else if (item.movieInfo !== undefined) {
            new_rec.title = item.movieInfo.movieTitle;
            new_rec.recType = "movie";
            new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
              item.movieInfo.posterS3Key
            );
            new_rec.externalURL = item.movieInfo.imdb_link;
            new_rec.description = item.movieInfo.description;
            new_rec.mediaID = item.movieID
          } else if (item.bookInfo !== undefined) {
            new_rec.title = item.bookInfo[0].bookTitle;
            new_rec.imageURL = item.bookInfo[0].thumbnail;
            new_rec.recType = "book";
            new_rec.description = item.bookInfo[0].description;
            new_rec.mediaID = item.bookID
          }
          feed.push(new_rec);
        });
        dispatch({
          type: GET_GROUP_FEED,
          data: feed,
          next: resData.next,
          name: groupName,
          id: groupID,
        });
        dispatch({
          type: SET_ACTIVE_GROUP,
          data: {
            name: groupName,
            id: groupID,
          },
        });
      }
    } catch (err) {
      throw new Error("could not load group feed")
    }
  };
};
