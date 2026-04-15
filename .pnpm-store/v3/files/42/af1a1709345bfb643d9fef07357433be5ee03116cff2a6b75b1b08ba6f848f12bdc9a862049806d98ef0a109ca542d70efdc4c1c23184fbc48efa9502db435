function buildHtml(template, callbacks) {
  return callbacks.reduce((promise, buildHtmlCb) => promise.then((template2) => buildHtmlCb(template2)), Promise.resolve(template));
}
export {
  buildHtml
};
