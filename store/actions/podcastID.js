import { SET_PODCAST_ID } from './types';

export const setPodcastID = (id) => {
    return (dispatch, state) => {
        dispatch({
            type: SET_PODCAST_ID,
            data: id
        })
    }
}