/**
 * modified from https://github.com/farrow-js/farrow/tree/master/packages/farrow-pipeline
 * license at https://github.com/farrow-js/farrow/blob/master/LICENSE
 */
export type Context<T = any> = {
    use: () => {
        value: T;
    };
    get: () => T;
    set: (value: T) => void;
};
export declare const createContext: <T>(value: T) => Context<T>;
