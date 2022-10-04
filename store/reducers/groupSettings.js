import { UPDATE_GROUP_SETTINGS_GROUP } from "../actions/types";
import { LOGOUT } from '../auth/authActions'

const initialState = {
  createdAt: "",
  creatorUserID: null,
  groupDesc: "",
  groupID: null,
  groupJoinCode: "",
  groupMembers: [],
  groupName: "",
  groupS3Key: "https://d3cemh7k7c204q.cloudfront.net/general/default.png",
  updatedAt: "",
};

const GroupSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GROUP_SETTINGS_GROUP:
      let pictureKey = "";
      if (action.data.groupS3Key === "") {
        pictureKey =
          "https://d3cemh7k7c204q.cloudfront.net/general/default.png";
      } else {
        pictureKey =
          "https://dbgtjb94040g6.cloudfront.net/" +
          action.data.groupS3Key;
      }
      return {
        createdAt: action.data.createdAt,
        creatorUserID: action.data.creatorUserID,
        groupDesc: action.data.groupDesc,
        groupID: action.data.groupID,
        groupJoinCode: action.data.groupJoinCode,
        groupMembers: action.data.groupMembers,
        groupName: action.data.groupName,
        groupS3Key: pictureKey,
        updatedAt: action.data.updatedAt,
      };
      break;

    case LOGOUT:
      return initialState
    default:
      return state;
      break;
  }
};

export default GroupSettingsReducer;
