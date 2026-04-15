/// <reference types="node" />
import type { LoaderContext } from 'webpack';
type Context = {
    mapFile: string;
    loaderId: string;
    clientData?: boolean;
    action: boolean;
    inline: boolean;
    routeId: string;
    retain: boolean;
};
export default function loader(this: LoaderContext<Context>, source: string): Promise<string | Buffer | undefined>;
export {};
