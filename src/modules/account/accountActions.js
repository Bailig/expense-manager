
export const PAGE_UPDATE = 'account/PAGE_UPDATE';


export const updatePage = ({ accountIndex, pageIndex }) => {
  return { type: PAGE_UPDATE, payload: { accountIndex, currentPageIndex: pageIndex } };
};
