import * as path from "path";
function addSourceMappingUrl(code, loc) {
  return `${code}
//# sourceMappingURL=${path.normalize(path.basename(loc))}`;
}
export {
  addSourceMappingUrl
};
