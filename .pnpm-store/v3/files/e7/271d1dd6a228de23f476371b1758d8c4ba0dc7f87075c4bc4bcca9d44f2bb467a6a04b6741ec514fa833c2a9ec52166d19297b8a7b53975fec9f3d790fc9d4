import { type LinkProps as RouterLinkProps, type NavLinkProps as RouterNavLinkProps } from '@modern-js/runtime-utils/router';
import React from 'react';
export declare function composeEventHandlers<EventType extends React.SyntheticEvent | Event>(theirHandler: ((event: EventType) => any) | undefined, ourHandler: (event: EventType) => any): (event: EventType) => any;
/**
 * Modified from https://github.com/remix-run/remix/blob/9a0601bd704d2f3ee622e0ddacab9b611eb0c5bc/packages/remix-react/components.tsx#L218
 *
 * MIT Licensed
 * Author Michael Jackson
 * Copyright 2021 Remix Software Inc.
 * https://github.com/remix-run/remix/blob/2b5e1a72fc628d0408e27cf4d72e537762f1dc5b/LICENSE.md
 */
/**
 * Defines the prefetching behavior of the link:
 *
 * - "intent": Fetched when the user focuses or hovers the link
 * - "render": Fetched when the link is rendered
 * - "none": Never fetched
 */
type PrefetchBehavior = 'intent' | 'render' | 'none';
export interface LinkProps extends RouterLinkProps {
    prefetch?: PrefetchBehavior;
}
export interface NavLinkProps extends RouterNavLinkProps {
    prefetch?: PrefetchBehavior;
}
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
declare const NavLink: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { Link, NavLink };
