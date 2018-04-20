import * as firebase from 'firebase';

export const ON_CHANGE = 'transaction/ON_CHANGE';
export const ON_CHANGE_SUCCESS = 'transaction/ON_CHANGE_SUCCESS';
export const PUSH = 'transaction/PUSH';
export const PUSH_SUCCESS = 'transaction/PUSH_SUCCESS';


export const onTransactionChange = () => async (dispatch) => {
  dispatch({ type: ON_CHANGE });
  firebase.database().ref('transaction').on('value', (snapshot) => {
    let transactions = {};
    Object.entries(snapshot.val()).forEach((keyValuePair) => {
      transactions = { ...transactions, ...keyValuePair[1] };
    });
    dispatch({ type: ON_CHANGE_SUCCESS, payload: transactions });
  });
};
