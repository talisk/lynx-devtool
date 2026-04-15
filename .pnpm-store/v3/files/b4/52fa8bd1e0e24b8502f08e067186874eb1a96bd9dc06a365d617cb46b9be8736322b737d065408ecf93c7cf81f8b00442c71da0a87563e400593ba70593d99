import path from "path";
import { fs, MAIN_ENTRY_NAME, ROUTE_SPEC_FILE } from "@modern-js/utils";
const generateRoutes = async (appContext) => {
  const { serverRoutes, distDirectory } = appContext;
  const output = JSON.stringify({
    routes: serverRoutes
  }, null, 2);
  await fs.outputFile(path.join(distDirectory, ROUTE_SPEC_FILE), output);
};
const getPathWithoutExt = (filename) => {
  const extname = path.extname(filename);
  return filename.slice(0, -extname.length);
};
const isMainEntry = (entryName, mainEntryName) => {
  return entryName === (mainEntryName || MAIN_ENTRY_NAME);
};
export {
  generateRoutes,
  getPathWithoutExt,
  isMainEntry
};
