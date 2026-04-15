"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
const _tsd = require("tsd");
const _ = require("..");
const count1Model = (0, _.model)("count1").define({
  state: {
    value: 1
  },
  actions: {
    add(state) {
      return {
        ...state,
        value: state.value + 1
      };
    },
    sub(state, n) {
      return {
        ...state,
        value: state.value - n
      };
    }
  }
});
const count2Model = (0, _.model)("count2").define({
  state: {
    value: 10
  },
  actions: {
    add1(state) {
      return {
        ...state,
        value: state.value + 1
      };
    },
    sub1(state, n) {
      return {
        ...state,
        value: state.value - n
      };
    }
  }
});
describe("test selector", () => {
  const store = (0, _.createStore)();
  test("select state should work", () => {
    const [state] = store.use(count1Model, count2Model, (state1, state2) => ({
      one: state1.value,
      two: state2.value
    }));
    (0, _tsd.expectType)(state);
  });
  test("select actions should work", () => {
    const use = () => store.use(count1Model, count2Model, (state1, state2) => ({
      one: state1.value,
      two: state2.value
    }), (actions1, actions2) => ({
      oneAdd: actions1.add,
      twoAdd: actions2.add1,
      oneSub: actions1.sub,
      twoSub: actions2.sub1
    }));
    const [state, actions] = use();
    (0, _tsd.expectType)(state);
    (0, _tsd.expectType)(actions);
  });
});
