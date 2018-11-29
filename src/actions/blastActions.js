import * as types from './actionTypes';
import * as blastsApi from '../api/blastsApi';

export function sendBlastSuccess(text) {
  return {
    type: types.SEND_BLAST_SUCCESS,
    text,
  };
}

export function sendBlastFailure(message) {
  return {
    type: types.SEND_BLAST_FAILURE,
    message,
  };
}

export function sendBlast(blast) {
  return (dispatch) => {
    return blastsApi.sendBlast(blast)
      .then(() => {
        dispatch(sendBlastSuccess(blast));
      })
      .catch((error) => {
        dispatch(sendBlastFailure({
          title: 'Oops',
          text: 'There was an issue posting your Blast™, please try again',
        }));
        console.error(error);
      });
  };
}
