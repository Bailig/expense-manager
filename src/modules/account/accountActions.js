
export const UPDATE = 'account/UPDATE';


export const updatePagination = ({
  accountIndex, currentPageNumber, lastPageNumber, paginationItem,
}) => {
  let pageNumber;
  let pageNumbers = [1, 2, 3, 4, 5];
  switch (paginationItem) {
    case 'first':
      pageNumber = 1;
      break;
    case 'prev':
      pageNumber = currentPageNumber - 1;
      pageNumbers = pageNumber.map(p => p - 1);
      break;
    case 1:
      if (currentPageNumber > 2) {
        pageNumber = currentPageNumber - 2;
        pageNumbers = pageNumber.map(p => p - 2);
      } else if (currentPageNumber === 2) {
        pageNumber = currentPageNumber - 1;
        pageNumbers = pageNumber.map(p => p - 1);
      } else if (currentPageNumber === lastPageNumber) {
        pageNumber = currentPageNumber - 4;
        pageNumbers = pageNumber.map(p => p - 4);
      } else if (currentPageNumber === lastPageNumber - 1) {
        pageNumber = currentPageNumber - 3;
        pageNumbers = pageNumber.map(p => p - 3);
      }
      break;
    case 2:
      pageNumber = currentPageNumber - 2;
      pageNumbers = pageNumber.map(p => p - 2);
      break;
    case 3:
      pageNumber = currentPageNumber - 2;
      pageNumbers = pageNumber.map(p => p - 2);
      break;
    case 4:
      pageNumber = currentPageNumber - 2;
      pageNumbers = pageNumber.map(p => p - 2);
      break;
    case 5:
      pageNumber = currentPageNumber - 2;
      pageNumbers = pageNumber.map(p => p - 2);
      break;
    case 'next':
      pageNumber = currentPageNumber - 2;
      pageNumbers = pageNumber.map(p => p - 2);
      break;
    case 'last':
      pageNumber = lastPageNumber;
      pageNumbers = pageNumber.map(p => p - 2);
      break;
    default:
      break;
  }
  return { type: UPDATE, payload: { accountIndex, currentPageNumber: pageNumber, pageNumbers } };
};


const renderPageNumber = (paginationItemPosition) => {
  if (currentPageNumber <= 3) {
    return paginationItemPosition;
  } else if (currentPageNumber > 3 && currentPageNumber <= lastPageNumber - 2) {
    switch (paginationItemPosition) {
      case 1:
        return currentPageNumber - 2;
      case 2:
        return currentPageNumber - 1;
      case 3:
        return currentPageNumber;
      case 4:
        return currentPageNumber + 1;
      case 5:
        return currentPageNumber + 2;
      default:
        break;
    }
  } else {
    switch (paginationItemPosition) {
      case 1:
        return lastPageNumber - 4;
      case 2:
        return lastPageNumber - 3;
      case 3:
        return lastPageNumber - 2;
      case 4:
        return lastPageNumber - 1;
      case 5:
        return lastPageNumber;
      default:
        break;
    }
  }
};
