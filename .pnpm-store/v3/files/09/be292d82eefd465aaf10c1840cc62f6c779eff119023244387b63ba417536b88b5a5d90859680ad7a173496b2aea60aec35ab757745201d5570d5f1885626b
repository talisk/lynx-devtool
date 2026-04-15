import { useLayoutEffect, useRef } from "react";
const WithCallback = ({ callback, children }) => {
  const once = useRef(false);
  useLayoutEffect(() => {
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
