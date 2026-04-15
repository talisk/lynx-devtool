import { pluginDagSort } from "@modern-js/utils/universal/plugin-dag-sort";
const checkPlugins = (plugins) => {
  if (process.env.NODE_ENV !== "production") {
    plugins.forEach((origin) => {
      origin.rivals.forEach((rival) => {
        plugins.forEach((plugin) => {
          if (rival === plugin.name) {
            throw new Error(`${origin.name} has rival ${plugin.name}`);
          }
        });
      });
      origin.required.forEach((required) => {
        if (!plugins.some((plugin) => plugin.name === required)) {
          throw new Error(`The plugin: ${required} is required when plugin: ${origin.name} is exist.`);
        }
      });
    });
  }
};
function sortPlugins(input) {
  return pluginDagSort(input.slice());
}
const includePlugin = (plugins, input) => plugins.some((plugin) => plugin.name === input.name);
const isObject = (obj) => obj !== null && typeof obj === "object";
const hasOwnProperty = (obj, prop) => obj.hasOwnProperty(prop);
export {
  checkPlugins,
  hasOwnProperty,
  includePlugin,
  isObject,
  sortPlugins
};
