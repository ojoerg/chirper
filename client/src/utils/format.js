export const addZeroToNumbers = dateItem => {
    if (dateItem < 10) {
      return "0" + dateItem;
    } else {
      return dateItem;
    }
  };