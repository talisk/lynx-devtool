"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
const _tsd = require("tsd");
const _ = require("..");
const modelA = (0, _.model)("modelA").define({
  state: {
    a: 1
  },
  computed: {
    double(s) {
      return s.a + 1;
    }
  }
});
const modelB = (0, _.model)("modelB").define({
  state: {
    b: "10"
  },
  computed: {
    str: [
      modelA,
      (s, other) => {
        return s.b.repeat(other.a);
      }
    ]
  }
});
describe("test computed", () => {
  const store = (0, _.createStore)();
  test("basic usage", () => {
    const [state] = store.use(modelA);
    (0, _tsd.expectType)(state);
  });
  test("depend on other models", () => {
    const use = () => store.use(modelA, modelB);
    const [state] = use();
    (0, _tsd.expectType)(state);
  });
});
