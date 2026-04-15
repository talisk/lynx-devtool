export declare enum SSRTimings {
    PRERENDER = "ssr-prerender",
    RENDER_HTML = "ssr-render-html",
    RENDER_SHELL = "ssr-render-shell",
    USE_LOADER = "use-loader"
}
export declare enum SSRErrors {
    PRERENDER = "App Prerender",
    USE_LOADER = "App run useLoader",
    RENDER_HTML = "App Render To HTML",
    RENDER_STREAM = "An error occurs during streaming SSR",
    RENDER_SHELL = "An error occurs during streaming render shell"
}
export type Tracer = {
    onError: OnError;
    onTiming: OnTiming;
};
export type OnError = (key: SSRErrors, e: unknown) => void;
export declare function createOnError(onError?: (e: unknown) => void): OnError;
export type OnTiming = (key: SSRTimings, cost: number) => void;
export declare function createOnTiming(onTiming?: (name: string, dur: number) => void): OnTiming;
