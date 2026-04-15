class I18CLILanguageDetector {
  formatShellLocale(rawLC) {
    if (!rawLC) {
      return "";
    }
    const LCs = rawLC.split(":");
    const LC = LCs[0].split(".")[0].split("_")[0].split("-")[0];
    if (LC === "C") {
      return "";
    }
    return LC;
  }
  detect() {
    var _process_env_LC_ALL, _ref, _ref1, _ref2;
    const shellLocale = (_ref2 = (_ref1 = (_ref = (_process_env_LC_ALL = process.env.LC_ALL) !== null && _process_env_LC_ALL !== void 0 ? _process_env_LC_ALL : process.env.LC_MESSAGES) !== null && _ref !== void 0 ? _ref : process.env.LANG) !== null && _ref1 !== void 0 ? _ref1 : process.env.LANGUAGE) !== null && _ref2 !== void 0 ? _ref2 : Intl.DateTimeFormat().resolvedOptions().locale;
    return this.formatShellLocale(shellLocale);
  }
}
function getLocaleLanguage() {
  const detector = new I18CLILanguageDetector();
  return detector.detect();
}
export {
  I18CLILanguageDetector,
  getLocaleLanguage
};
