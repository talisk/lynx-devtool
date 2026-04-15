/// <reference types="node" />
import path from 'path';
export declare const CONFIG_FILE_NAME = "modern.config";
export declare const LOCAL_CONFIG_FILE_NAME = "modern.config.local";
export declare const PACKAGE_JSON_CONFIG_NAME = "modernConfig";
/**
 * Get user config from package.json.
 * @param appDirectory - App root directory.
 * @returns modernConfig or undefined
 */
export declare const getPackageConfig: <T>(appDirectory: string, packageJsonConfig?: string) => T | undefined;
/**
 * Get the file dependencies by module.children, ignore file path in node_modules and this monorepo packages default.
 * @param filePath - Absolute file path.
 * @returns File dependencies array.
 */
export declare const getDependencies: (filePath: string) => string[];
/**
 *
 * @param targetDir target dir
 * @param overtime Unit of second
 */
export declare const clearFilesOverTime: (targetDir: string, overtime: number) => Promise<void>;
export declare const getConfigFilePath: (appDirectory: string, filePath?: string) => string | false;
/**
 * Parse and load user config file, support extensions like .ts, mjs, js, ejs.
 * @param appDirectory - App root directory, from which start search user config file.
 * @param configFile - Specific absolute config file path.
 * @returns Object contain config file path, user config object and dependency files used by config file.
 */
export declare const loadConfig: <T>(appDirectory: string, configFile: string | false, packageJsonConfig?: string, loadedConfig?: T | undefined) => Promise<{
    path: string | false;
    config?: T | undefined;
    dependencies?: string[] | undefined;
    pkgConfig?: T | undefined;
}>;
