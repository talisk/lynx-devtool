import { removeTailSlash } from "@modern-js/utils";
import { createCopyInfo } from "../shared";
var minifiedJsRexExp = /\.min\.js/;
var info = function(file) {
  return {
    // If the file name ends with `.min.js`, we assume it's a compressed file.
    // So we don't want copy-webpack-plugin to minify it.
    // ref: https://github.com/webpack-contrib/copy-webpack-plugin#info
    minimized: minifiedJsRexExp.test(file.sourceFilename)
  };
};
function createPublicPattern(appContext, config, chain) {
  var publicDir = createCopyInfo(appContext, config).publicDir;
  return {
    info,
    from: "**/*",
    to: "public",
    context: publicDir,
    noErrorOnMissing: true,
    transform: function(content, absoluteFrom) {
      if (!/\.html?$/.test(absoluteFrom)) {
        return content;
      }
      return content.toString("utf8").replace(/<%=\s*assetPrefix\s*%>/g, removeTailSlash(chain.output.get("publicPath")));
    }
  };
}
function createUploadPattern(appContext, config) {
  var uploadDir = createCopyInfo(appContext, config).uploadDir;
  return {
    // rspack copy info structure is inconsistent with webpack, it only used in webpack mode
    // @ts-expect-error
    info,
    from: "**/*",
    to: "upload",
    context: uploadDir,
    noErrorOnMissing: true
  };
}
export {
  createPublicPattern,
  createUploadPattern
};
