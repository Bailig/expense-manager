import * as firebase from 'firebase';

export const ON_CHANGE = 'master-card/ON_CHANGE';
export const ON_CHANGE_SUCCESS = 'master-card/ON_CHANGE_SUCCESS';
export const PUSH = 'master-card/PUSH';
export const PUSH_SUCCESS = 'master-card/PUSH_SUCCESS';


export const onMasterCardChange = () => async (dispatch) => {
  dispatch({ type: ON_CHANGE });
  firebase.database().ref('transaction').orderByValue('transactionDate').on('value', (snapshot) => {
    dispatch({ type: ON_CHANGE_SUCCESS, payload: snapshot.val() });
  });
};
