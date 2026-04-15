import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { buildShellAfterTemplate } from "./afterTemplate";
import { buildShellBeforeTemplate } from "./beforeTemplate";
var HTML_SEPARATOR = "<!--<?- html ?>-->";
var getTemplates = function() {
  var _ref = _async_to_generator(function(htmlTemplate, options) {
    var _ref2, tmp, beforeAppTemplate, tmp1, afterAppHtmlTemplate, builtBeforeTemplate, builtAfterTemplate;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          _ref2 = _sliced_to_array(htmlTemplate.split(HTML_SEPARATOR) || [], 2), tmp = _ref2[0], beforeAppTemplate = tmp === void 0 ? "" : tmp, tmp1 = _ref2[1], afterAppHtmlTemplate = tmp1 === void 0 ? "" : tmp1;
          return [
            4,
            buildShellBeforeTemplate(beforeAppTemplate, options)
          ];
        case 1:
          builtBeforeTemplate = _state.sent();
          return [
            4,
            buildShellAfterTemplate(afterAppHtmlTemplate, options)
          ];
        case 2:
          builtAfterTemplate = _state.sent();
          return [
            2,
            {
              shellBefore: builtBeforeTemplate,
              shellAfter: builtAfterTemplate
            }
          ];
      }
    });
  });
  return function getTemplates2(htmlTemplate, options) {
    return _ref.apply(this, arguments);
  };
}();
export {
  getTemplates
};
