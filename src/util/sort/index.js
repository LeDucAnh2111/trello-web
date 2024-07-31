const Sort = (array, orderArray, key) => {
  // const cloneArray = [...array];
  // const orderedArray = cloneArray.sort((a, b) => {
  //   return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  // });

  // console.log(orderedArray);
  // return orderedArray;
  return [...array].sort((a, b) => {
    let newArray = orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
    return newArray;
  });
};

export default Sort;
