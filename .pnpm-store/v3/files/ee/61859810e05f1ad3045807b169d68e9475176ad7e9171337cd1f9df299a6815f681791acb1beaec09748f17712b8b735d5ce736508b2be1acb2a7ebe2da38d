import path from "path";
var generateClient = function(param) {
  var inline = param.inline, action = param.action, routeId = param.routeId;
  var requestCode = "";
  var requestCreatorPath = path.join(__dirname, "./createRequest").replace("/cjs/cli/", "/esm/cli/").replace(/\\/g, "/");
  var importCode = "\n    import { createRequest, createActionRequest } from '".concat(requestCreatorPath, "';\n  ");
  if (inline) {
    if (action) {
      requestCode = "\n      export const loader = createRequest('".concat(routeId, "');\n      export const action = createActionRequest('").concat(routeId, "')\n    ");
    } else {
      requestCode = "\n      export const loader = createRequest('".concat(routeId, "');\n    ");
    }
  } else {
    requestCode = "\n    export default createRequest('".concat(routeId, "');\n  ");
  }
  var generatedCode = "\n    ".concat(importCode, "\n    ").concat(requestCode, "\n  ");
  return generatedCode;
};
export {
  generateClient
};
