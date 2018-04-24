
export const UPDATE = 'account/UPDATE';


export const updateAccountPageNumber = ({ accountIndex, pageNumber }) => {
  return { type: UPDATE, payload: { accountIndex, currentPageNumber: pageNumber } };
};
