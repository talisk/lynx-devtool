function createSourceConfig(config) {
  var _config_source = config.source, alias = _config_source.alias, envVars = _config_source.envVars, globalVars = _config_source.globalVars, include = _config_source.include, moduleScopes = _config_source.moduleScopes, preEntry = _config_source.preEntry, entries = _config_source.entries, mainEntryName = _config_source.mainEntryName, enableAsyncEntry = _config_source.enableAsyncEntry, enableCustomEntry = _config_source.enableCustomEntry, disableDefaultEntries = _config_source.disableDefaultEntries, entriesDir = _config_source.entriesDir, configDir = _config_source.configDir;
  var builderGlobalVars = globalVars || {};
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = (envVars || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var envVar = _step.value;
      var envVarValue = process.env[envVar];
      envVarValue && (builderGlobalVars["process.env.".concat(envVar)] = envVarValue);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return {
    alias,
    moduleScopes,
    globalVars: builderGlobalVars,
    include,
    preEntry,
    entries,
    mainEntryName,
    enableAsyncEntry,
    enableCustomEntry,
    disableDefaultEntries,
    entriesDir,
    configDir,
    resolveExtensionPrefix: {
      web: ".web",
      node: ".node"
    }
  };
}
export {
  createSourceConfig
};
