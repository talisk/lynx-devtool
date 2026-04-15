const createCounter = (callback) => {
  const dispatch = (index, input) => {
    const next = (nextInput = input) => dispatch(index + 1, nextInput);
    return callback(index, input, next);
  };
  return {
    start: (input) => dispatch(0, input),
    dispatch
  };
};
export {
  createCounter
};
