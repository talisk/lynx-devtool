import { defaultDistFileExtMap } from "./constants";
const defaultOptions = {
  enableWatch: false,
  enableVirtualDist: false,
  extensions: [],
  filenames: [],
  distFileExtMap: defaultDistFileExtMap,
  ignore: [],
  quiet: false,
  verbose: false,
  clean: false
};
const mergeDefaultOption = (compilerOptions) => ({
  ...defaultOptions,
  ...compilerOptions
});
export {
  mergeDefaultOption
};
