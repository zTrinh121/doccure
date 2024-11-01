export const getKebabDateString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export const incrementDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
};

export const getDateArr = (start, end) => {
  console.log('start', start);
  let result = [];
  let tempStart = start;
  do {
    console.log(1, tempStart);
    result.push(tempStart);
    tempStart = incrementDate(tempStart);
  } while (tempStart < end);
  return result;
};
