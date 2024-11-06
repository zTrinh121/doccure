export const getTimeString = ({ date, start, end }) => {
  return (`${date
    } ${start.slice(
      0,
      5,
    )} - ${end.slice(0, 5)}`)
}