"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var createCli_exports = {};
__export(createCli_exports, {
  createCli: () => createCli,
  mergeOptions: () => mergeOptions
});
module.exports = __toCommonJS(createCli_exports);
var import_utils = require("@modern-js/utils");
var import_config = require("./config");
var import_context = require("./context");
var import_loadEnv = require("./loadEnv");
var import_loadPlugins = require("./loadPlugins");
var import_manager = require("./manager");
var import_utils2 = require("./utils");
var import_checkIsDuplicationPlugin = require("./utils/checkIsDuplicationPlugin");
const setProgramVersion = (version = "unknown") => {
  import_utils.program.name("modern").usage("<command> [options]").version(version);
};
const mergeOptions = (options) => {
  const defaultOptions = {
    runtimeConfigFile: import_utils.DEFAULT_RUNTIME_CONFIG,
    serverConfigFile: import_utils.DEFAULT_SERVER_CONFIG
  };
  return {
    ...defaultOptions,
    ...options
  };
};
const createCli = () => {
  let hooksRunner;
  let initOptions;
  const init = async (options) => {
    var _mergedOptions_options, _mergedOptions_internalPlugins, _mergedOptions_internalPlugins1;
    import_manager.manager.clear();
    const mergedOptions = mergeOptions(options);
    initOptions = mergedOptions;
    const appDirectory = await (0, import_utils2.initAppDir)(options === null || options === void 0 ? void 0 : options.cwd);
    (0, import_utils2.initCommandsMap)();
    setProgramVersion(options === null || options === void 0 ? void 0 : options.version);
    var _mergedOptions_options_metaName;
    const metaName = (_mergedOptions_options_metaName = mergedOptions === null || mergedOptions === void 0 ? void 0 : (_mergedOptions_options = mergedOptions.options) === null || _mergedOptions_options === void 0 ? void 0 : _mergedOptions_options.metaName) !== null && _mergedOptions_options_metaName !== void 0 ? _mergedOptions_options_metaName : "MODERN";
    (0, import_loadEnv.loadEnv)(appDirectory, process.env[`${metaName.toUpperCase()}_ENV`]);
    const loaded = await (0, import_config.createLoadedConfig)(appDirectory, mergedOptions === null || mergedOptions === void 0 ? void 0 : mergedOptions.configFile, mergedOptions === null || mergedOptions === void 0 ? void 0 : mergedOptions.packageJsonConfig, mergedOptions === null || mergedOptions === void 0 ? void 0 : mergedOptions.loadedConfig);
    const plugins = await (0, import_loadPlugins.loadPlugins)(appDirectory, loaded.config, {
      internalPlugins: mergedOptions === null || mergedOptions === void 0 ? void 0 : (_mergedOptions_internalPlugins = mergedOptions.internalPlugins) === null || _mergedOptions_internalPlugins === void 0 ? void 0 : _mergedOptions_internalPlugins.cli,
      autoLoad: mergedOptions === null || mergedOptions === void 0 ? void 0 : (_mergedOptions_internalPlugins1 = mergedOptions.internalPlugins) === null || _mergedOptions_internalPlugins1 === void 0 ? void 0 : _mergedOptions_internalPlugins1.autoLoad,
      forceAutoLoadPlugins: mergedOptions === null || mergedOptions === void 0 ? void 0 : mergedOptions.forceAutoLoadPlugins
    });
    (0, import_checkIsDuplicationPlugin.checkIsDuplicationPlugin)(plugins.map((plugin) => plugin.name), loaded.config.autoLoadPlugins);
    plugins.forEach((plugin) => plugin && import_manager.manager.usePlugin(plugin));
    const appContext = (0, import_context.initAppContext)({
      appDirectory,
      plugins,
      configFile: loaded.filePath,
      runtimeConfigFile: (mergedOptions === null || mergedOptions === void 0 ? void 0 : mergedOptions.runtimeConfigFile) || "",
      options: mergedOptions === null || mergedOptions === void 0 ? void 0 : mergedOptions.options,
      serverConfigFile: (mergedOptions === null || mergedOptions === void 0 ? void 0 : mergedOptions.serverConfigFile) || ""
    });
    import_context.ConfigContext.set(loaded.config);
    import_context.AppContext.set(appContext);
    hooksRunner = await import_manager.manager.init();
    [
      "SIGINT",
      "SIGTERM",
      "unhandledRejection",
      "uncaughtException"
    ].forEach((event) => {
      process.on(event, async (err) => {
        hooksRunner.beforeExit();
        let hasError = false;
        if (err instanceof Error) {
          import_utils.logger.error(err.stack);
          hasError = true;
        } else if (err && (event === "unhandledRejection" || event === "uncaughtException")) {
          console.trace("Unknown Error", err);
          hasError = true;
        }
        process.nextTick(() => {
          process.exit(hasError ? 1 : 0);
        });
      });
    });
    await hooksRunner.beforeConfig();
    const extraConfigs = await hooksRunner.config();
    const normalizedConfig = await (0, import_config.createResolveConfig)(loaded, extraConfigs);
    const { resolved } = await hooksRunner.resolvedConfig({
      resolved: normalizedConfig
    });
    import_context.ConfigContext.set(loaded.config);
    import_context.ResolvedConfigContext.set(resolved);
    await hooksRunner.prepare();
    await hooksRunner.afterPrepare();
    return {
      resolved,
      appContext: (0, import_context.useAppContext)()
    };
  };
  async function run(options) {
    var _program_commands;
    const { appContext } = await init(options);
    await hooksRunner.commands({
      program: import_utils.program
    });
    await (0, import_utils2.createFileWatcher)(appContext, hooksRunner);
    import_utils.program.parse(process.argv);
    if (!((_program_commands = import_utils.program.commands) === null || _program_commands === void 0 ? void 0 : _program_commands.length)) {
      import_utils.logger.warn("No command found, please make sure you have registered plugins correctly.");
    }
  }
  async function runCommand(command, commandOptions = [], options) {
    const argv = process.argv.slice(0, 2).concat(command).concat(commandOptions);
    process.env.MODERN_ARGV = argv.join(" ");
    const { appContext } = await init(options);
    await hooksRunner.commands({
      program: import_utils.program
    });
    await (0, import_utils2.createFileWatcher)(appContext, hooksRunner);
    import_utils.program.parse(argv);
  }
  async function test(argv, options) {
    const newProgram = new import_utils.Command();
    const { coreOptions } = options !== null && options !== void 0 ? options : {};
    await init(coreOptions);
    await hooksRunner.commands({
      program: newProgram
    });
    await newProgram.parseAsync(argv);
  }
  return {
    init,
    run,
    test,
    runCommand,
    getPrevInitOptions: () => initOptions
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCli,
  mergeOptions
});
