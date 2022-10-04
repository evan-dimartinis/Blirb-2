import {
  GET_CURRENT_USER_PIC,
  GET_USER_INFO,
  GET_USER_LISTS_BY_ID,
} from "./types";
import listItem from "../../models/listItem";


export const getUserInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    let response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=currentuserinfo`,
      {
        method: "GET",
      }
    );
    let resData = await response.json();
    let listResponse = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&userID=${resData.id}&endpoint=userlists/`,
      {
        method: "GET",
      }
    );
    let listResData = await listResponse.json();
    let finalLists = []
    listResData.forEach(list => {
      let abbList = []
      list.items.forEach(item => {
        let new_rec = new listItem(
          item.rankingItemID,
          null,
          null,
          null,
          null,
          null
        )
        if (
          item.podcastID !== null &&
          item.episodeID === null
        ) {
          new_rec.title = item.podcastInfo.title;
          new_rec.imageURL = item.podcastInfo.spotifyImageURL;
          new_rec.recType = "podcast";
          new_rec.description = item.podcastInfo.description;
          new_rec.externalURL = item.podcastInfo.spotifyURL;
        } else if (item.episodeID !== null) {
          new_rec.title = item.episodeInfo.name;
          new_rec.imageURL = item.episodeInfo.spotifyImageURL;
          new_rec.recType = "podcast-ep";
          new_rec.description = item.episodeInfo.description;
          new_rec.externalURL = item.episodeInfo.spotify_url;
        } else if (item.tvShowID !== null) {
          new_rec.title = item.tvShowInfo.showTitle;
          new_rec.recType = "tv";
          new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
            item.tvShowInfo.posterS3Key
          );
          new_rec.description = item.tvShowInfo.description;
        } else if (item.movieID !== null) {
          new_rec.title = item.movieInfo.movieTitle;
          new_rec.recType = "movie";
          new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
            item.movieInfo.posterS3Key
          );
          new_rec.description = item.movieInfo.description;
        } else if (item.bookID !== null) {
          new_rec.title = item.bookInfo[0].bookTitle;
          new_rec.imageURL = item.bookInfo[0].thumbnail;
          new_rec.recType = "book";
          new_rec.description = item.bookInfo[0].description;
        }
        abbList.push(new_rec)
      })
      list.items = abbList
    })
    let picResponse = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=user/currentprofilepicture`,
      {
        method: "GET",
      }
    );
    let picResData = await picResponse.json();
    if (picResData.length > 0) {
      dispatch({
        type: GET_USER_INFO,
        data: resData,
        S3Key: 'https://dbgtjb94040g6.cloudfront.net/'+picResData[0].S3Key,
        lists: listResData
      });
    } else {
      dispatch({
        type: GET_USER_INFO,
        data: resData,
        S3Key: "https://d3cemh7k7c204q.cloudfront.net/general/default.png",
        lists: listResData
      });
    }
  };
};

export const getCurrentUserProfilePicture = () => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    let response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=user/currentprofilepicture`,
      {
        method: "GET",
      }
    );
    let resData = await response.json();
    dispatch({
      type: GET_CURRENT_USER_PIC,
      data: resData[0],
    });
  };
};

export const getUserListsByID = (userID, username) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    let response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=userlists/?userID=${userID}`,
      {
        method: "GET",
      }
    );
    let resData = await response.json();
    let finalLists = []
    resData.forEach(list => {
      let abbList = []
      list.items.forEach(item => {
        let new_rec = new listItem(
          null,
          null,
          null,
          null,
          null
        )
        if (
          item.podcastID !== null &&
          item.episodeID === null
        ) {
          new_rec.title = item.podcastInfo.title;
          new_rec.imageURL = item.podcastInfo.spotifyImageURL;
          new_rec.recType = "podcast";
          new_rec.description = item.podcastInfo.description;
          new_rec.externalURL = item.podcastInfo.spotifyURL;
        } else if (item.episodeID !== null) {
          new_rec.title = item.episodeInfo.name;
          new_rec.imageURL = item.episodeInfo.spotifyImageURL;
          new_rec.recType = "podcast-ep";
          new_rec.description = item.episodeInfo.description;
          new_rec.externalURL = item.episodeInfo.spotify_url;
        } else if (item.tvShowID !== null) {
          new_rec.title = item.tvShowInfo.showTitle;
          new_rec.recType = "tv";
          new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
            item.tvShowInfo.posterS3Key
          );
          new_rec.description = item.tvShowInfo.description;
        } else if (item.movieID !== null) {
          new_rec.title = item.movieInfo.movieTitle;
          new_rec.recType = "movie";
          new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
            item.movieInfo.posterS3Key
          );
          new_rec.description = item.movieInfo.description;
        } else if (item.bookID !== null) {
          new_rec.title = item.bookInfo[0].bookTitle;
          new_rec.imageURL = item.bookInfo[0].thumbnail;
          new_rec.recType = "book";
          new_rec.description = item.bookInfo[0].description;
        }
        abbList.push(new_rec)
      })
      finalLists.push({
        nameOfRankings: list.nameOfRankings,
        id: list.rankingsID,
        items: abbList
      })
    })
    let Inforesponse = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=usernameinfo/${username}`,
      {
        method: "GET",
      }
    );
    const InfoResData = await Inforesponse.json();
    const picResponse = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=user/${userID}/profilepicture`,
      {
        method: "GET",
      }
    );
    const picResData = await picResponse.json();
    if (picResData[0]) {
      dispatch({
        type: GET_USER_LISTS_BY_ID,
        lists: finalLists,
        info: InfoResData,
        S3Key: "https://dbgtjb94040g6.cloudfront.net/"+picResData[0].S3Key,
      });
    } else {
      dispatch({
        type: GET_USER_LISTS_BY_ID,
        lists: finalLists,
        info: InfoResData,
        S3Key: "https://d3cemh7k7c204q.cloudfront.net/general/default.png",
      });
    }
  };
};

export const getUserInfoByID = (ID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    let response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&userID=${userID}&endpoint=userinfo/${ID}`,
      {
        method: "GET",
      }
    );
    const resData = await response.json();
  };
};
