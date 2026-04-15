type PlainObject = {
    [key: string]: any;
};
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare function merge<T extends PlainObject, U extends PlainObject[]>(target: T, ...sources: U): T & UnionToIntersection<U[number]>;
export {};
