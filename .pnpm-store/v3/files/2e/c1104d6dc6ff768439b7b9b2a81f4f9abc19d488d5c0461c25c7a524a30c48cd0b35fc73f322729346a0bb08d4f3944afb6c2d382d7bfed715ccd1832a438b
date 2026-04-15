import { ReduckContext, Context, OnMountHook, Actions, Computed } from "../types";
type ModelInitialParams = [context: ReduckContext, hook: {
  use: Context['apis']['useModel'];
  onMount: OnMountHook;
}];
type ExtDesc<S, State> = {
  actions?: Actions<State extends void ? S : State>;
  computed?: Computed<State extends void ? S : State>;
};
type ModelFn = <State = void>(name: string) => {
  define: (<S, M extends ExtDesc<S, State> & {
    state: S;
  } = ExtDesc<S, State> & {
    state: S;
  }, Resp = {
    _name: string;
    _: Omit<M, 'state'> & {
      state: State extends void ? S : State;
    };
  }>(c: (...args: ModelInitialParams) => M & {
    state: S;
  }) => Resp & ((ns: string) => Resp & ((ns: string) => Resp)) & {
    state: State extends void ? S : State;
  }) & (<S, M extends ExtDesc<S, State> & {
    state: S;
  } = ExtDesc<S, State> & {
    state: S;
  }, Resp = {
    _name: string;
    _: Omit<M, 'state'> & {
      state: State extends void ? S : State;
    };
  }>(c: M & {
    state: S;
  }) => Resp & {
    (ns: string): Resp & ((ns: string) => Resp);
    _name: string;
    _: Omit<M, 'state'> & {
      state: State extends void ? S : State;
    };
  });
};
declare const model: ModelFn;
export default model;