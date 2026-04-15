import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
function processHrtime(previousTimestamp) {
  var now = (/* @__PURE__ */ new Date()).getTime();
  var clocktime = now * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
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
var getLatency = function(hrtime) {
  var _processHrtime = _sliced_to_array(processHrtime(hrtime), 2), s = _processHrtime[0], ns = _processHrtime[1];
  return s * 1e3 + ns / 1e6;
};
var time = function() {
  var hrtime = processHrtime();
  return function() {
    return getLatency(hrtime);
  };
};
export {
  time
};
