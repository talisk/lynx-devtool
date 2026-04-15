import { expectType } from "tsd";
import { createStore, model } from "..";
const modelA = model("modelA").define({
  state: {
    a: 1
  },
  computed: {
    double(s) {
      return s.a + 1;
    }
  }
});
const modelB = model("modelB").define({
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
  const store = createStore();
  test("basic usage", () => {
    const [state] = store.use(modelA);
    expectType(state);
  });
  test("depend on other models", () => {
    const use = () => store.use(modelA, modelB);
    const [state] = use();
    expectType(state);
  });
});
