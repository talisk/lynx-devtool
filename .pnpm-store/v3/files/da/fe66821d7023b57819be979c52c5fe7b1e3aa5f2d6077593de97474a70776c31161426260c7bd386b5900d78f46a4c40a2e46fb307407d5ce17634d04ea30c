import { buildShellAfterTemplate } from "./afterTemplate";
import { buildShellBeforeTemplate } from "./beforeTemplate";
const HTML_SEPARATOR = "<!--<?- html ?>-->";
const getTemplates = async (htmlTemplate, options) => {
  const [beforeAppTemplate = "", afterAppHtmlTemplate = ""] = htmlTemplate.split(HTML_SEPARATOR) || [];
  const builtBeforeTemplate = await buildShellBeforeTemplate(beforeAppTemplate, options);
  const builtAfterTemplate = await buildShellAfterTemplate(afterAppHtmlTemplate, options);
  return {
    shellBefore: builtBeforeTemplate,
    shellAfter: builtAfterTemplate
  };
};
export {
  getTemplates
};
