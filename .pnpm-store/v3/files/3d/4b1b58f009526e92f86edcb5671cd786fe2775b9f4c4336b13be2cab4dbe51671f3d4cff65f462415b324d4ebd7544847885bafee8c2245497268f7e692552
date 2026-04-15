import { Context, Model } from "../types";
export declare const GetUnsubscribe: unique symbol;
declare const createSubscribe: (context: Context, model: Model) => {
  (handler: () => void): () => void;
  [GetUnsubscribe]: any;
};
declare const combineSubscribe: (context: Context, ...subscribes: ReturnType<typeof createSubscribe>[]) => (handler: () => void) => () => void;
export { createSubscribe, combineSubscribe };