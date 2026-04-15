function buildHtml(template, callbacks) {
  return callbacks.reduce(function(promise, buildHtmlCb) {
    return promise.then(function(template2) {
      return buildHtmlCb(template2);
    });
  }, Promise.resolve(template));
}
export {
  buildHtml
};
