import { useEffect, useLayoutEffect } from "react";
export const canUseDOM = Boolean(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
export const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
