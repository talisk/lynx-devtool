import path from "node:path";
import { AGGRED_DIR } from "@modern-js/server-core";
import { connectMid2HonoMid } from "@modern-js/server-core/node";
import { fs } from "@modern-js/utils";
import { match } from "path-to-regexp";
let mockAPIs = [];
let mockConfig;
const parseKey = (key) => {
  const _blank = " ";
  const splitted = key.split(_blank).filter(Boolean);
  if (splitted.length > 1) {
    const [method, pathname] = splitted;
    return {
      method: method.toLowerCase(),
      path: pathname
    };
  }
  return {
    method: "get",
    path: key
  };
};
const getMockModule = async (pwd) => {
  const exts = [
    ".ts",
    ".js"
  ];
  let mockFilePath = "";
  for (const ext of exts) {
    const maybeMatch = path.join(pwd, `${AGGRED_DIR.mock}/index${ext}`);
    if (await fs.pathExists(maybeMatch)) {
      mockFilePath = maybeMatch;
      break;
    }
  }
  if (!mockFilePath) {
    return void 0;
  }
  const { default: mockHandlers, config } = await import(mockFilePath);
  const enable = config === null || config === void 0 ? void 0 : config.enable;
  if (enable === false) {
    return void 0;
  }
  if (!mockHandlers) {
    throw new Error(`Mock file ${mockFilePath} parsed failed!`);
  }
  return {
    mockHandlers,
    config
  };
};
const getMatched = (request, mockApis) => {
  const { path: targetPathname, method: targetMethod } = request;
  const matched = mockApis.find((mockApi) => {
    const { method, path: pathname } = mockApi;
    if (method.toLowerCase() === targetMethod.toLowerCase()) {
      return match(pathname, {
        encode: encodeURI,
        decode: decodeURIComponent
      })(targetPathname);
    }
    return false;
  });
  return matched;
};
async function initOrUpdateMockMiddlewares(pwd) {
  const mockModule = await getMockModule(pwd);
  mockConfig = mockModule === null || mockModule === void 0 ? void 0 : mockModule.config;
  mockAPIs = Object.entries((mockModule === null || mockModule === void 0 ? void 0 : mockModule.mockHandlers) || {}).map(([key, handler]) => {
    const { method, path: path2 } = parseKey(key);
    return {
      method,
      path: path2,
      handler
    };
  });
}
async function getMockMiddleware(pwd) {
  await initOrUpdateMockMiddlewares(pwd);
  const mockMiddleware = async (c, next) => {
    if (typeof (mockConfig === null || mockConfig === void 0 ? void 0 : mockConfig.enable) === "function") {
      const isEnabled = mockConfig.enable(c.env.node.req, c.env.node.res);
      if (!isEnabled) {
        return next();
      }
    }
    const matchedMockAPI = getMatched(c.req, mockAPIs);
    if (matchedMockAPI) {
      const { handler } = matchedMockAPI;
      if (typeof handler === "function") {
        return await connectMid2HonoMid(handler)(c, next);
      } else {
        return c.json(handler);
      }
    }
    return next();
  };
  return mockMiddleware;
}
export {
  getMatched,
  getMockMiddleware,
  initOrUpdateMockMiddlewares
};
