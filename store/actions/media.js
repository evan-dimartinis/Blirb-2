import {
  GET_MAIN_FEED,
  GET_USER_GROUPS,
  GET_NEXT_MAIN_FEED,
  GET_PREVIOUS_MAIN_FEED,
  ADD_FEED_IMAGE,
} from "./types";
import { Recommendation } from "../../models/recommendation.model";
import { AbbreviatedRecommendation } from "../../models/abbreviatedRecommendation";

export const endorseRecommendation = (recID) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=POST&endpoint=currentuser/addorremoveendorsement/&recID=${recID}`,
      {
        method: "POST",
      }
    );
    const resData = await response.json();
  };
};

export const getNextMainFeed = (next) => {
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
          item.userID,
          null,
          null
        );
        if (item.podcastInfo !== undefined && item.episodeInfo === undefined) {
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
          new_rec.description = item.tvShowInfo.description;
          new_rec.mediaID = item.tvShowID;
        } else if (item.movieInfo !== undefined) {
          new_rec.title = item.movieInfo.movieTitle;
          new_rec.recType = "movie";
          new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
            item.movieInfo.posterS3Key
          );
          new_rec.externalURL = item.movieInfo.imdb_link;
          new_rec.description = item.movieInfo.description;
          new_rec.mediaID = item.movieID;
        } else if (item.bookInfo !== undefined) {
          new_rec.title = item.bookInfo[0].bookTitle;
          new_rec.imageURL = item.bookInfo[0].thumbnail;
          new_rec.recType = "book";
          new_rec.description = item.bookInfo[0].description;
          new_rec.mediaID = item.bookID;
        }
        feed.push(new_rec);
      });
      if (next) {
        dispatch({
          type: GET_NEXT_MAIN_FEED,
          data: feed,
          next: resData.next,
          current: nextLink,
        });
      } else {
        dispatch({
          type: GET_PREVIOUS_MAIN_FEED,
          data: feed,
          next: resData.next,
          current: nextLink,
        });
      }
    }
  };
};

export const getMainFeed = () => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=currentuser/overallfeedlo/`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Overall Feed Request Failed");
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
            try {
              const imageres = fetch(item.podcastInfo.spotifyImageURL)
                .then((response) => {
                  return response.blob();
                })
                .then((blob) => {
                  
                  const fileReader = new FileReader();
                  let base64data;
                  fileReader.readAsDataURL(blob);
                  fileReader.onload = () => {
                    base64data = fileReader.result;
                  };
                  return base64data;
                })
                .then((blob) => {
                  dispatch({
                    type: ADD_FEED_IMAGE,
                    data: blob,
                  });
                });
            } catch (err) {
              
            }

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
            new_rec.description = item.tvShowInfo.description;
            new_rec.mediaID = item.tvShowID;
          } else if (item.movieInfo !== undefined) {
            new_rec.title = item.movieInfo.movieTitle;
            new_rec.recType = "movie";
            new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(
              item.movieInfo.posterS3Key
            );
            new_rec.externalURL = item.movieInfo.imdb_link;
            new_rec.description = item.movieInfo.description;
            new_rec.mediaID = item.movieID;
          } else if (item.bookInfo !== undefined) {
            new_rec.title = item.bookInfo[0].bookTitle;
            new_rec.imageURL = item.bookInfo[0].thumbnail;
            new_rec.recType = "book";
            new_rec.description = item.bookInfo[0].description;
            new_rec.externalURL = item.bookInfo[0].previewLink;
            new_rec.mediaID = item.bookID;
          }
          feed.push(new_rec);
        });
        /* const resData = await response.json();
      const feed = []
      resData.results.forEach(item => {
        
        const new_rec = new Recommendation(
          item.groupRecID,
          null,
          item.endorsements,
          item.endorsements,
          item.createdAt,
          item.updatedAt,
          item.userID,
          item.recID_id,
          item.recommendationDesc,
          item.recommenderRating,
          item.username,
          item.first_name,
          item.last_name,
          item.movieInfo,
          item.podcastInfo,
          item.episodeInfo,
          item.bookInfo,
          item.tvShowInfo,
          item.comments,
          item.groups,
          item.episodeID,
          null,
          null,
          null
        )
        if (item.podcastInfo !== undefined && item.episodeInfo === undefined) {
          new_rec.title = item.podcastInfo.title
          new_rec.imageURL = item.podcastInfo.spotifyImageURL
          new_rec.recType = 'podcast'
        } else if (item.episodeInfo !== undefined) {
          (item)
          new_rec.title = item.episodeInfo.name;
          new_rec.imageURL = item.episodeInfo.spotifyImageURL;
          new_rec.recType = 'podcast-ep'
        } else if (item.tvShowInfo !== undefined) {
          new_rec.title = item.tvShowInfo.showTitle;
          new_rec.recType = 'tv'
          new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(item.tvShowInfo.posterS3Key);
        } else if (item.movieInfo !== undefined) {
          new_rec.title = item.movieInfo.movieTitle;
          new_rec.recType = 'movie'
          new_rec.imageURL = "https://image.tmdb.org/t/p/w500//".concat(item.movieInfo.posterS3Key);
        } else if (item.bookInfo !== undefined) {
          new_rec.title = item.bookInfo[0].bookTitle;
          new_rec.imageURL = item.bookInfo[0].thumbnail;
          new_rec.recType = 'book'
        }
        feed.push(new_rec)
      }) */
        dispatch({
          type: GET_MAIN_FEED,
          data: feed,
          next: resData.next,
        });
      }
    } catch (err) {
      throw err;
    }
  };
};

export const getUserGroups = () => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=usersgrouplist/`,
      {
        method: "GET",
      }
    );
    const resData = await response.json();
    dispatch({
      type: GET_USER_GROUPS,
      data: resData,
    });
  };
};

const createBlobFromURL = async (imageURL) => {
  fetch(imageURL)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      const fileReader = new FileReader();
      let base64data;
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        base64data = fileReader.result;
      };
      return base64data;
    })
    .then((blob) => {
      dispatch({
        type: ADD_FEED_IMAGE,
        data: blob,
      });
    });
};
