import { REPLACE_REG } from "../../constants";
class TemplateApi {
  set(content) {
    this.body = content;
  }
  get() {
    return this.body;
  }
  prependHead(fragment) {
    const { head } = REPLACE_REG.before;
    this.replaceBody(new RegExp(head), (beforeHead) => `${beforeHead}${fragment}`);
  }
  appendHead(fragment) {
    const { head } = REPLACE_REG.after;
    this.replaceBody(head, () => `${fragment}${head}`);
  }
  prependBody(fragment) {
    const { body } = REPLACE_REG.before;
    this.replaceBody(new RegExp(body), (beforeBody) => `${beforeBody}${fragment}`);
  }
  appendBody(fragment) {
    const { body } = REPLACE_REG.after;
    this.replaceBody(body, () => `${fragment}${body}`);
  }
  replaceBody(searchValue, replaceCb) {
    this.body = this.body.replace(searchValue, replaceCb);
  }
  constructor(body) {
    this.body = body;
  }
}
export {
  TemplateApi
};
