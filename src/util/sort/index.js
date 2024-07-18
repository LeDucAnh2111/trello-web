const Sort = (array, orderArray, key) => {
  // const cloneArray = [...array];
  // const orderedArray = cloneArray.sort((a, b) => {
  //   return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  // });
  // return orderedArray;
  return [...array].sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });
};

export default Sort;
