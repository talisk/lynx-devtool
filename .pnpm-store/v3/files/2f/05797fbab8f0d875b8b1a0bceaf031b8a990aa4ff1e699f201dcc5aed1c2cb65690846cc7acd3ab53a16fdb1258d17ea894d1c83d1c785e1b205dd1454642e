import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { expectType } from "tsd";
import { createStore, model } from "..";
const count1Model = model("count1").define({
  state: {
    value: 1
  },
  actions: {
    add(state) {
      return _object_spread_props(_object_spread({}, state), {
        value: state.value + 1
      });
    },
    sub(state, n) {
      return _object_spread_props(_object_spread({}, state), {
        value: state.value - n
      });
    }
  }
});
const count2Model = model("count2").define({
  state: {
    value: 10
  },
  actions: {
    add1(state) {
      return _object_spread_props(_object_spread({}, state), {
        value: state.value + 1
      });
    },
    sub1(state, n) {
      return _object_spread_props(_object_spread({}, state), {
        value: state.value - n
      });
    }
  }
});
describe("test selector", () => {
  const store = createStore();
  test("select state should work", () => {
    const [state] = store.use(count1Model, count2Model, (state1, state2) => ({
      one: state1.value,
      two: state2.value
    }));
    expectType(state);
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
    expectType(state);
    expectType(actions);
  });
});
