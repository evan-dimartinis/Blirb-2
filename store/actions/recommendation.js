import { REC_TO_MODAL } from './types';

export const importRec = (Rec) => {
    return async (dispatch, getState) => {
        dispatch({
            type: REC_TO_MODAL,
            data: Rec
        })
    }
}