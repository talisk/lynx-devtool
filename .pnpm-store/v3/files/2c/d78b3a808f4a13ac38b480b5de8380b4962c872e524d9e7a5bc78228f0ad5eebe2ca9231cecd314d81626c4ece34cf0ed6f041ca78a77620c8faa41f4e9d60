type LoaderFn<P = any, T = any> = (context: any, params: P) => Promise<T>;
export interface LoaderOptions<Params = any, TData = any, TError extends Error = any> {
    /**
     * Revoke when loader excuted successfully.
     */
    onSuccess?: (data: TData) => void;
    /**
     * Revoke when loader ended with error
     */
    onError?: (error: TError) => void;
    /**
     * initialData to display once loader is ready.
     */
    initialData?: TData;
    /**
     * whether skip loader
     * if true, the loader will not exec.
     */
    skip?: boolean;
    /**
     * User params, it will pass to loader's second parameter.
     */
    params?: Params;
    /**
     * whether loader can exec on build phase.
     */
    static?: boolean;
}
declare const useLoader: <TData = any, Params = any, E = any>(loaderFn: LoaderFn<Params, TData>, options?: LoaderOptions<Params, any, any>) => {
    reload: (params?: Params | undefined) => Promise<any> | undefined;
    loading: boolean;
    reloading: boolean;
    data: TData;
    error: E;
};
export default useLoader;
