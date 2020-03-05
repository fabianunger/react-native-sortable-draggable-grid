
// Calculates whether a given point is within a given area
export const isPointWithinArea = (pointX,     // x coordinate
                                  pointY,     // y coordinate
                                  areaTlX,    // top left x coordinate
                                  areaTlY,    // top left y coordinate
                                  areaBrX,    // bottom right x coordinate
                                  areaBrY     // bottom right y coordinate
) => areaTlX <= pointX && pointX <= areaBrX       // is within horizontal axis
    && areaTlY <= pointY && pointY <= areaBrY        // is within vertical axis
;

// Moves an object within a given array from one position to another
export const moveArrayElement = (array,         // array of objects
                                 from,        // element to move index
                                 to,          // index where to move
                                 mergeProps // merge additional props into the object
) => {
  if (to > array.length) { return array; }
  // console.log("return array",array);

  // Remove the element we need to move
  const arr = [
    ...array.slice(0, from),
    ...array.slice(from + 1),
  ];
  // console.log("return array",array);
  // And add it back at a new position
  return [
    ...arr.slice(0, to),
    {
      ...array[from],
      ...mergeProps,    // merge passed props if any or nothing (empty object) by default
    },
    ...arr.slice(to),
  ];
};
