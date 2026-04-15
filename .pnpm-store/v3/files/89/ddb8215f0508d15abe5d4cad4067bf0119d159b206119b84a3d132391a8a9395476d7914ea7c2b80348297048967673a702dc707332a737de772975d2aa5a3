import { EOL } from "os";
import { safeReplace } from "./utils";
const RE_HTML_ATTR = /<html[^>]*>/;
const RE_BODY_ATTR = /<body[^>]*>/;
const RE_LAST_IN_HEAD = /<\/head>/;
const RE_TITLE = /<title[^>]*>([\s\S\n\r]*?)<\/title>/;
const TEST_TITLE_CONTENT = RegExp("(?<=<title[^>]*>)([\\s\\S\\n\\r]*?)([.|\\S])([\\s\\S\\n\\r]*?)(?=<\\/title>)");
function createReplaceHelemt(helmetData) {
  return helmetData ? (template) => helmetReplace(template, helmetData) : (tempalte) => tempalte;
}
function helmetReplace(content, helmetData) {
  let result = content;
  const bodyAttributes = helmetData.bodyAttributes.toString();
  if (bodyAttributes) {
    result = safeReplace(result, RE_BODY_ATTR, `<body ${bodyAttributes}>`);
  }
  const htmlAttributes = helmetData.htmlAttributes.toString();
  if (htmlAttributes) {
    result = safeReplace(result, RE_HTML_ATTR, `<html ${htmlAttributes}>`);
  }
  const base = helmetData.base.toString();
  const link = helmetData.link.toString();
  const meta = helmetData.meta.toString();
  const noscript = helmetData.noscript.toString();
  const script = helmetData.script.toString();
  const style = helmetData.style.toString();
  const title = helmetData.title.toString();
  const existTitleTag = RE_TITLE.test(content);
  const shouldReplaceTitle = existTitleTag && TEST_TITLE_CONTENT.test(title.trim());
  if (shouldReplaceTitle) {
    result = safeReplace(result, RE_TITLE, title);
  }
  const helmetStr = [
    base,
    link,
    meta,
    noscript,
    script,
    style,
    !existTitleTag ? title : ""
  ].reduce((pre, cur) => {
    return pre + (cur.length > 0 ? `  ${cur}${EOL}` : "");
  }, "");
  return safeReplace(result, RE_LAST_IN_HEAD, `${helmetStr}</head>`);
}
export {
  createReplaceHelemt,
  helmetReplace
};
