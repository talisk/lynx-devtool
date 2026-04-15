var parsedJSONFromElement = function(id) {
  var elements = document.querySelectorAll("#".concat(id));
  if (elements.length === 0) {
    return void 0;
  }
  var element = elements[elements.length - 1];
  if (element) {
    try {
      var parsed = JSON.parse((element === null || element === void 0 ? void 0 : element.textContent) || "");
      return parsed;
    } catch (e) {
      console.error("parse ".concat(id, " error"), e);
      return void 0;
    }
  }
  return void 0;
};
export {
  parsedJSONFromElement
};
