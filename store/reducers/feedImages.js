import { ADD_FEED_IMAGE } from "../actions/types";

const initialState = {
    images: []
}

export const FeedImagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FEED_IMAGE:
            return {
                images: state.images.concat(action.data)
            }
        default:
            return state;
    }
}

export default FeedImagesReducer;