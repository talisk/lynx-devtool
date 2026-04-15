import { type BuildShellAfterTemplateOptions } from './afterTemplate';
import { type BuildShellBeforeTemplateOptions } from './beforeTemplate';
export type InjectTemplate = {
    shellBefore: string;
    shellAfter: string;
};
type GetTemplatesOptions = BuildShellAfterTemplateOptions & BuildShellBeforeTemplateOptions;
export declare const getTemplates: (htmlTemplate: string, options: GetTemplatesOptions) => Promise<InjectTemplate>;
export {};
