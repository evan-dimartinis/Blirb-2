import {
  SEARCH_MOVIESTV,
  SEARCH_PODCASTS,
  SEARCH_BOOKS,
  GET_PODCAST_EPISODES,
  CLEAR_SEARCH_RESULTS,
  GET_NEXT_PODCAST_EPISODES,
} from "../actions/types";
import { LOGOUT } from '../auth/authActions';

const initialState = {
  Results: [],
  podcastEpisodes: [],
  nextEpisodesLink: ""
};

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIESTV:
      return {
        Results: action.data,
        podcastEpisodes: [],
        nextEpisodesLink: state.nextEpisodesLink
      };
    case SEARCH_PODCASTS:
      return {
        Results: action.data,
        podcastEpisodes: [],
        nextEpisodesLink: state.nextEpisodesLink
      };
    case SEARCH_BOOKS:
      return {
        Results: action.data,
        podcastEpisodes: [],
        nextEpisodesLink: state.nextEpisodesLink
      };
    case GET_PODCAST_EPISODES:
      return {
        Results: state.Results,
        podcastEpisodes: action.data,
        nextEpisodesLink: action.next,
      };
    case GET_NEXT_PODCAST_EPISODES:
      return {
        Results: state.Results,
        podcastEpisodes: state.podcastEpisodes.concat(action.data),
        nextEpisodesLink: action.next,
      }
    case CLEAR_SEARCH_RESULTS:
      return initialState;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};