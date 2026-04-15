var html = function(partials) {
  return "\n<!DOCTYPE html>\n<html>\n<head>\n\n  ".concat(partials.top.join("\n"), "\n\n  ").concat(partials.head.join("\n"), '\n\n</head>\n\n<body>\n  <div id="<%= mountId %>"><!--<?- html ?>--></div>\n  ').concat(partials.body.join("\n"), "\n  <!--<?- chunksMap.js ?>-->\n  <!--<?- SSRDataScript ?>-->\n  <!--<?- bottomTemplate ?>-->\n</body>\n\n</html>\n");
};
export {
  html
};
