import { createPlugin } from "@modern-js-reduck/store";
import { produce, enableES5, enableMapSet, setAutoFreeze } from "immer";
enableES5();
enableMapSet();
setAutoFreeze(false);
export default createPlugin(() => ({
  beforeReducer(reducer) {
    return (state, payload, ...extraArgs) => produce(state, (draft) => reducer(draft, payload, ...extraArgs));
  }
}));
