import type { ComponentType, NamedExoticComponent } from 'react';
import type { Model, GetModelActions, GetModelState } from '@modern-js-reduck/store';
export declare type Shared<InjectedProps, DecorationTargetProps> = { [P in Extract<keyof InjectedProps, keyof DecorationTargetProps>]?: InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : never };
export declare type ConnectedComponent<C extends ComponentType<any>, P> = NamedExoticComponent<JSX.LibraryManagedAttributes<C, P>>;
export declare type GetProps<C> = C extends ComponentType<infer P> ? P : never;
export declare type Matching<InjectedProps, DecorationTargetProps> = { [P in keyof DecorationTargetProps]: P extends keyof InjectedProps ? InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : InjectedProps[P] : DecorationTargetProps[P] };
export declare type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <C extends ComponentType<Matching<TInjectedProps, GetProps<C>>>>(component: C) => ConnectedComponent<C, Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps>;
declare type SelectActionsToProps4<S1, S2, S3, S4, OwnProps, ActionsToProps> = (s1: S1, s2: S2, s3: S3, s4: S4, ownProps: OwnProps) => ActionsToProps;
declare type SelectActionsToProps3<S1, S2, S3, OwnProps, ActionsToProps> = (s1: S1, s2: S2, s3: S3, ownProps: OwnProps) => ActionsToProps;
declare type SelectActionsToProps2<S1, S2, OwnProps, ActionsToProps> = (s1: S1, s2: S2, ownProps: OwnProps) => ActionsToProps;
declare type SelectActionsToProps1<S1, OwnProps, ActionsToProps> = (s1: S1, ownProps: OwnProps) => ActionsToProps;
declare type SelectStateToProps4<S1, S2, S3, S4, OwnProps, StateToProps> = (s1: S1, s2: S2, s3: S3, s4: S4, ownProps: OwnProps) => StateToProps;
declare type SelectStateToProps3<S1, S2, S3, OwnProps, StateToProps> = (s1: S1, s2: S2, s3: S3, ownProps: OwnProps) => StateToProps;
declare type SelectStateToProps2<S1, S2, OwnProps, StateToProps> = (s1: S1, s2: S2, ownProps: OwnProps) => StateToProps;
declare type SelectStateToProps1<S1, OwnProps, StateToProps> = (s1: S1, ownProps: OwnProps) => StateToProps;
export interface ConnectOptions {
  forwardRef?: boolean;
}
export declare function connect<OwnProps = {}, M1 extends Model = Model>(m1: [M1] | M1, opt?: ConnectOptions): InferableComponentEnhancerWithProps<GetModelState<M1> & GetModelActions<M1>, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model>(models: [M1, M2], opt?: ConnectOptions): InferableComponentEnhancerWithProps<GetModelActions<M1> & GetModelActions<M2> & GetModelState<M1> & GetModelState<M2>, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, M3 extends Model = Model>(models: [M1, M2, M3], opt?: ConnectOptions): InferableComponentEnhancerWithProps<GetModelActions<M1> & GetModelActions<M2> & GetModelState<M3> & {
  actions: GetModelState<M1> & GetModelState<M2> & GetModelActions<M3>;
}, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, M3 extends Model = Model, M4 extends Model = Model>(models: [M1, M2, M3, M4], opt?: ConnectOptions): InferableComponentEnhancerWithProps<GetModelActions<M1> & GetModelActions<M2> & GetModelState<M3> & GetModelState<M4> & {
  actions: GetModelState<M1> & GetModelState<M2> & GetModelActions<M3> & GetModelActions<M4>;
}, OwnProps>;
export declare function connect<OwnProps = {}>(models: Model[], opt?: ConnectOptions): InferableComponentEnhancerWithProps<any, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, StateToProps = {}>(models: [M1, SelectStateToProps1<GetModelActions<M1>, OwnProps, StateToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & GetModelState<M1>, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, StateToProps = {}, ActionsToProps = {}>(models: [M1, SelectStateToProps1<GetModelState<M1>, OwnProps, StateToProps>, SelectActionsToProps1<GetModelActions<M1>, OwnProps, ActionsToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & ActionsToProps, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, StateToProps = {}>(models: [M1, M2, SelectStateToProps2<GetModelActions<M1>, GetModelActions<M2>, OwnProps, StateToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & GetModelState<M1> & GetModelState<M2>, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, StateToProps = {}, ActionsToProps = {}>(models: [M1, M2, SelectStateToProps2<GetModelState<M1>, GetModelState<M2>, OwnProps, StateToProps>, SelectActionsToProps2<GetModelActions<M1>, GetModelActions<M2>, OwnProps, ActionsToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & ActionsToProps, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, M3 extends Model = Model, StateToProps = {}>(models: [M1, M2, M3, SelectStateToProps3<GetModelActions<M1>, GetModelActions<M2>, GetModelState<M3>, OwnProps, StateToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & {
  actions: GetModelState<M1> & GetModelState<M2> & GetModelActions<M3>;
}, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, M3 extends Model = Model, StateToProps = {}, ActionsToProps = {}>(models: [M1, M2, M3, SelectStateToProps3<GetModelActions<M1>, GetModelActions<M2>, GetModelState<M3>, OwnProps, StateToProps>, SelectActionsToProps3<GetModelState<M1>, GetModelState<M2>, GetModelActions<M3>, OwnProps, ActionsToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & ActionsToProps, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, M3 extends Model = Model, M4 extends Model = Model, StateToProps = {}>(models: [M1, M2, M3, M4, SelectStateToProps4<GetModelActions<M1>, GetModelActions<M2>, GetModelState<M3>, GetModelState<M4>, OwnProps, StateToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & {
  actions: GetModelState<M1> & GetModelState<M2> & GetModelActions<M3> & GetModelActions<M4>;
}, OwnProps>;
export declare function connect<OwnProps = {}, M1 extends Model = Model, M2 extends Model = Model, M3 extends Model = Model, M4 extends Model = Model, StateToProps = {}, ActionsToProps = {}>(models: [M1, M2, M3, M4, SelectStateToProps4<GetModelActions<M1>, GetModelActions<M2>, GetModelState<M3>, GetModelState<M4>, OwnProps, StateToProps>, SelectActionsToProps4<GetModelState<M1>, GetModelState<M2>, GetModelActions<M3>, GetModelActions<M4>, OwnProps, ActionsToProps>], opt?: ConnectOptions): InferableComponentEnhancerWithProps<StateToProps & ActionsToProps, OwnProps>;
export declare type GetConnectType<T> = T extends InferableComponentEnhancerWithProps<infer R, infer P> ? R & P : never;
export {};