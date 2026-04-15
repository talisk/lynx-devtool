import { useLayoutEffect, useRef } from "react";
var WithCallback = function(param) {
  var callback = param.callback, children = param.children;
  var once = useRef(false);
  useLayoutEffect(function() {
    if (once.current) {
      return;
    }
    once.current = true;
    callback();
  }, [
    callback
  ]);
  return children;
};
export {
  WithCallback
};
