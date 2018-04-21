
export const UPDATE = 'filteringForm/UPDATE';


export const updateField = ({ prop, value }) => {
  return { type: UPDATE, payload: { prop, value } };
};
