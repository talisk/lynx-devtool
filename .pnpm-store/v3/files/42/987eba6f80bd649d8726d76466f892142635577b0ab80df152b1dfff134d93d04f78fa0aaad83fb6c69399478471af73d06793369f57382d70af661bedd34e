function processHrtime(previousTimestamp) {
  const now = (/* @__PURE__ */ new Date()).getTime();
  const clocktime = now * 1e-3;
  let seconds = Math.floor(clocktime);
  let nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds -= previousTimestamp[0];
    nanoseconds -= previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [
    seconds,
    nanoseconds
  ];
}
const getLatency = (hrtime) => {
  const [s, ns] = processHrtime(hrtime);
  return s * 1e3 + ns / 1e6;
};
const time = () => {
  const hrtime = processHrtime();
  return () => {
    return getLatency(hrtime);
  };
};
export {
  time
};
