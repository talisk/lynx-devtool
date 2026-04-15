import path from "path";
import { ENTRY_POINT_REGISTER_FILE_NAME } from "./constants";
const builderPluginAlias = ({ entrypoints, internalDirectory, metaName }) => ({
  name: "runtime:alias",
  setup(api) {
    api.modifyRsbuildConfig((userConfig, { mergeRsbuildConfig }) => {
      const entrypointsAlias = {};
      const mainEntrypointsAlias = {};
      entrypoints.forEach((entrypoint) => {
        entrypointsAlias[`@${metaName}/runtime/registry/${entrypoint.entryName}`] = path.join(internalDirectory, entrypoint.entryName, ENTRY_POINT_REGISTER_FILE_NAME);
        if (entrypoint.isMainEntry) {
          mainEntrypointsAlias[`@${metaName}/runtime/registry`] = path.join(internalDirectory, entrypoint.entryName, ENTRY_POINT_REGISTER_FILE_NAME);
        }
      });
      return mergeRsbuildConfig(userConfig, {
        source: {
          alias: {
            ...entrypointsAlias,
            ...mainEntrypointsAlias
          }
        }
      });
    });
  }
});
export {
  builderPluginAlias
};
