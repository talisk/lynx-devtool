import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { chalk, inquirer } from "@modern-js/utils";
import { i18n, localeKeys } from "../locale";
var getSelectedEntries = function() {
  var _ref = _async_to_generator(function(entry, entrypoints) {
    var entryNames, selected;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          entryNames = entrypoints.map(function(e) {
            return e.entryName;
          });
          if (!entry) {
            return [
              2,
              entryNames
            ];
          }
          if (!(typeof entry === "boolean"))
            return [
              3,
              2
            ];
          return [
            4,
            inquirer.prompt([
              {
                type: "checkbox",
                name: "selected",
                choices: entryNames,
                message: i18n.t(localeKeys.command.dev.selectEntry),
                validate: function validate(answer) {
                  if (answer.length < 1) {
                    return i18n.t(localeKeys.command.dev.requireEntry);
                  }
                  return true;
                }
              }
            ])
          ];
        case 1:
          selected = _state.sent().selected;
          return [
            2,
            selected
          ];
        case 2:
          entry.forEach(function(name) {
            if (!entryNames.includes(name)) {
              throw new Error("Can not found entry ".concat(chalk.yellow(name), ", the entry should be one of ").concat(chalk.yellow(entryNames.join(", "))));
            }
          });
          return [
            2,
            entry
          ];
      }
    });
  });
  return function getSelectedEntries2(entry, entrypoints) {
    return _ref.apply(this, arguments);
  };
}();
export {
  getSelectedEntries
};
