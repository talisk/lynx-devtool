import { EOL } from "os";
import { safeReplace } from "./utils";
var RE_HTML_ATTR = /<html[^>]*>/;
var RE_BODY_ATTR = /<body[^>]*>/;
var RE_LAST_IN_HEAD = /<\/head>/;
var RE_TITLE = /<title[^>]*>([\s\S\n\r]*?)<\/title>/;
var TEST_TITLE_CONTENT = RegExp("(?<=<title[^>]*>)([\\s\\S\\n\\r]*?)([.|\\S])([\\s\\S\\n\\r]*?)(?=<\\/title>)");
function createReplaceHelemt(helmetData) {
  return helmetData ? function(template) {
    return helmetReplace(template, helmetData);
  } : function(tempalte) {
    return tempalte;
  };
}
function helmetReplace(content, helmetData) {
  var result = content;
  var bodyAttributes = helmetData.bodyAttributes.toString();
  if (bodyAttributes) {
    result = safeReplace(result, RE_BODY_ATTR, "<body ".concat(bodyAttributes, ">"));
  }
  var htmlAttributes = helmetData.htmlAttributes.toString();
  if (htmlAttributes) {
    result = safeReplace(result, RE_HTML_ATTR, "<html ".concat(htmlAttributes, ">"));
  }
  var base = helmetData.base.toString();
  var link = helmetData.link.toString();
  var meta = helmetData.meta.toString();
  var noscript = helmetData.noscript.toString();
  var script = helmetData.script.toString();
  var style = helmetData.style.toString();
  var title = helmetData.title.toString();
  var existTitleTag = RE_TITLE.test(content);
  var shouldReplaceTitle = existTitleTag && TEST_TITLE_CONTENT.test(title.trim());
  if (shouldReplaceTitle) {
    result = safeReplace(result, RE_TITLE, title);
  }
  var helmetStr = [
    base,
    link,
    meta,
    noscript,
    script,
    style,
    !existTitleTag ? title : ""
  ].reduce(function(pre, cur) {
    return pre + (cur.length > 0 ? "  ".concat(cur).concat(EOL) : "");
  }, "");
  return safeReplace(result, RE_LAST_IN_HEAD, "".concat(helmetStr, "</head>"));
}
export {
  createReplaceHelemt,
  helmetReplace
};
