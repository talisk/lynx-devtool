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
var templates_exports = {};
__export(templates_exports, {
  html: () => html
});
module.exports = __toCommonJS(templates_exports);
const html = (partials) => `
<!DOCTYPE html>
<html>
<head>

  ${partials.top.join("\n")}

  ${partials.head.join("\n")}

</head>

<body>
  <div id="<%= mountId %>"><!--<?- html ?>--></div>
  ${partials.body.join("\n")}
  <!--<?- chunksMap.js ?>-->
  <!--<?- SSRDataScript ?>-->
  <!--<?- bottomTemplate ?>-->
</body>

</html>
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  html
});
