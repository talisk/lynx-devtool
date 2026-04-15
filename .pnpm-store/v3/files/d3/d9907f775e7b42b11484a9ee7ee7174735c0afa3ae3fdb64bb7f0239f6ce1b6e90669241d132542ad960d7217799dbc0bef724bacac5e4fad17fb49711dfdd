interface Config {
  ns?: string;
  result?: string | false;
  error?: string | false;
  pending?: string | false;
  combineMode?: 'merge' | 'replace';
  omitResultNamespace?: boolean;
}
export default function handleEffect<State = any, Payload = any, Error = string>(config?: Config): {
  pending: (state: State) => State | void;
  fulfilled: (state: State, payload: Payload) => State | void;
  rejected: (state: State, error: Error) => State | void;
};
export {};