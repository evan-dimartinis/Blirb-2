import {
  SEARCH_MOVIESTV,
  SEARCH_PODCASTS,
  SEARCH_BOOKS,
  GET_PODCAST_EPISODES,
  CLEAR_SEARCH_RESULTS,
  SEARCH_USERS,
  GET_NEXT_PODCAST_EPISODES
} from "./types";
import { MovieSearchResult } from "../../models/movieSearchResult";
import { TVSearchResult } from "../../models/TVsearchResult";
import { PodcastSearchResult } from "../../models/podcastSearchResult";
import { BookSearchResult } from "../../models/bookSearchResult";
import { PodcastEpisodeSearchResult } from "../../models/podcastEpisodeSearchResult";

export const clearSearchResults = () => {
  return async (dispatch, getState) => {
    return dispatch({
      type: CLEAR_SEARCH_RESULTS,
    });
  };
};

export const getNextPodcastEpisodes = () => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const nextLink = getState().searchReducer.nextEpisodesLink;
    const episodeList = [];
    try {
      const response = await fetch(
        `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=${nextLink}`,
        {
          method: "GET"
        }
      )
      const resData = await response.json()
      resData.items.forEach((element) => {
        let episode = new PodcastEpisodeSearchResult(
          element.audio_preview_url,
          element.description,
          element.duration_ms,
          element.explicit,
          element.external_urls.spotify,
          element.id,
          element.images[0].url,
          element.is_externally_hosted,
          element.is_playable,
          element.language,
          element.name,
          element.release_date,
          element.type
        );
        episodeList.push(episode);
      });
      dispatch({
        type: GET_NEXT_PODCAST_EPISODES,
        data: episodeList,
        next: resData.next
      });
    } catch (err) {
      
    }
  }
}

export const getPodcastEpisodes = (id) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const episodeList = [];
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=podcasts/episodes/?podcastID=${id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
    } else {
      const resData = await response.json();
      resData.items.forEach((element) => {
        let episode = new PodcastEpisodeSearchResult(
          element.audio_preview_url,
          element.description,
          element.duration_ms,
          element.explicit,
          element.external_urls.spotify,
          element.id,
          element.images[0].url,
          element.is_externally_hosted,
          element.is_playable,
          element.language,
          element.name,
          element.release_date,
          element.type
        );
        episodeList.push(episode);
      });
      dispatch({
        type: GET_PODCAST_EPISODES,
        data: episodeList,
        next: resData.next
      });
    }
  };
};

export const searchBooks = (query) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const resultList = [];
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=books/search/?q=${query}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
    } else {
      const resData = await response.json();
      resData.items.forEach((item) => {
        if (item.volumeInfo.imageLinks == undefined) {
          let book = new BookSearchResult(
            item.id,
            item.volumeInfo.authors,
            item.volumeInfo.categories,
            item.volumeInfo.description,
            null,
            item.volumeInfo.infoLink,
            item.volumeInfo.language,
            item.volumeInfo.pageCount,
            item.volumeInfo.title
          );
          resultList.push(book);
        } else {
          let book = new BookSearchResult(
            item.id,
            item.volumeInfo.authors,
            item.volumeInfo.categories,
            item.volumeInfo.description,
            item.volumeInfo.imageLinks.thumbnail,
            item.volumeInfo.infoLink,
            item.volumeInfo.language,
            item.volumeInfo.pageCount,
            item.volumeInfo.title
          );
          resultList.push(book);
        }
      });
      dispatch({
        type: SEARCH_BOOKS,
        data: resultList,
      });
    }
  };
};

export const searchMoviesTV = (query) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const resultList = [];
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=movietv/search/?query=${query}&page=1`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
    } else {
      const resData = await response.json();

      resData.Content.forEach((element) => {
        if (element.media_type === "movie") {
          let result = new MovieSearchResult(
            element.adult,
            "https://image.tmdb.org/t/p/w500//".concat(element.backdrop_path),
            element.genre_ids,
            element.id,
            element.media_type,
            element.original_language,
            element.original_title,
            element.overview,
            element.popularity,
            "https://image.tmdb.org/t/p/w500//".concat(element.poster_path),
            element.release_date,
            element.title,
            element.video,
            element.vote_average,
            element.vote_count
          );
          resultList.push(result);
        } else if (element.media_type === "tv") {
          let tvresult = new TVSearchResult(
            "https://image.tmdb.org/t/p/w500//".concat(element.backdrop_path),
            element.first_air_date,
            element.genre_ids,
            element.id,
            element.media_type,
            element.name,
            element.origin_country,
            element.original_language,
            element.original_name,
            element.overview,
            element.popularity,
            "https://image.tmdb.org/t/p/w500//".concat(element.poster_path),
            element.vote_average,
            element.vote_count
          );
          resultList.push(tvresult);
        }
      });
    }
    dispatch({
      type: SEARCH_MOVIESTV,
      data: resultList,
    });
  };
};

export const searchPodcasts = (query) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const resultList = [];
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=podcasts/search/?q=${query}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
    } else {
      const resData = await response.json();
      resData.forEach((element) => {
        if (element.images !== undefined) {
          let result = new PodcastSearchResult(
            element.copyrights,
            element.description,
            element.explicit,
            element.external_urls,
            element.href,
            element.html_description,
            element.id,
            element.images[0].url,
            element.is_externally_hosted,
            element.languages,
            "podcast",
            element.name,
            element.publisher,
            element.total_episodes,
            element.type,
            element.uri
          );
          resultList.push(result);
        }
      });
      dispatch({
        type: SEARCH_PODCASTS,
        data: resultList,
      });
    }
  };
};

export const searchUsers = (query) => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.user.token;
    const response = await fetch(
      `https://5oksuqhlfg.execute-api.us-east-1.amazonaws.com/call?token=${token}&request_type=GET&endpoint=users/search/?username=${query}`,
      {
        method: "GET",
      }
    );
    const resData = await response.json()
    dispatch({
      type: SEARCH_USERS,
      data: resData
    })
  };
};
