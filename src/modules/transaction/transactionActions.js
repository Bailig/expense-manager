import * as firebase from 'firebase';

export const ON_CHANGE = 'transaction/ON_CHANGE';
export const ON_CHANGE_SUCCESS = 'transaction/ON_CHANGE_SUCCESS';
export const PUSH = 'transaction/PUSH';
export const PUSH_SUCCESS = 'transaction/PUSH_SUCCESS';


export const onTransactionChange = () => async (dispatch) => {
  dispatch({ type: ON_CHANGE });
  firebase.database().ref('transaction').on('value', (snapshot) => {
    dispatch({ type: ON_CHANGE_SUCCESS, payload: snapshot.val() });
  });
  // const transactionsSnapshot = await firebase.firestore().collection('transaction').get();
  // const payload = transactionsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  // dispatch({ type: ON_CHANGE_SUCCESS, payload });
};
