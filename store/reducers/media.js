import {
  GET_MAIN_FEED,
  GET_GROUP_FEED,
  GET_NEXT_MAIN_FEED,
  GET_PREVIOUS_MAIN_FEED,
  GET_NEXT_GROUP_FEED,
  GET_PREVIOUS_GROUP_FEED,
} from "../actions/types";
import { LOGOUT } from "../auth/authActions";

const initialState = {
  mainFeed: [],
  feedInfo: {
    name: "",
    id: 0,
  },
};

const MediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_FEED:
      return {
        mainFeed: action.data,
        feedInfo: {
          name: "Home",
          id: 0,
        },
      };
    case GET_NEXT_MAIN_FEED:
      state.previousLinks.push(state.currentLink)
      return {
        mainFeed: action.data,
        previousLinks: state.previousLinks,
        nextLink: action.next,
        currentLink: action.current,
        feedInfo: {
          name: state.feedInfo.name,
          id: 0,
        },
      };
    case GET_PREVIOUS_MAIN_FEED:
      state.previousLinks.pop()
      return {
        mainFeed: action.data,
        previousLinks: state.previousLinks,
        nextLink: action.next,
        currentLink: action.current,
        feedInfo: {
          name: state.feedInfo.name,
          id: 0
        }
      }
    case GET_GROUP_FEED:
      return {
        mainFeed: action.data,
        nextLink: action.next,
        currentLink: "main",
        previousLinks: [],
        feedInfo: {
          name: action.name,
          id: action.id,
        },
      };
    case GET_NEXT_GROUP_FEED:
      state.previousLinks.push(state.currentLink)
      return {
        mainFeed: action.data,
        previousLinks: state.previousLinks,
        nextLink: action.next,
        currentLink: action.current,
        feedInfo: {
          name: action.name,
          id: action.id,
        },
      }
    case GET_PREVIOUS_GROUP_FEED:
      state.previousLinks.pop()
      return {
        mainFeed: action.data,
        previousLinks: state.previousLinks,
        nextLink: action.next,
        currentLink: action.current,
        feedInfo: {
          name: action.name,
          id: action.id
        }
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default MediaReducer;
