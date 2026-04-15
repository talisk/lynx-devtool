import { applyPlugins } from "@modern-js/prod-server";
import { createDevServer } from "@modern-js/server";
let server = null;
const getServer = () => server;
const setServer = (newServer) => {
  server = newServer;
};
const closeServer = async () => {
  if (server) {
    server.close();
    server = null;
  }
};
const createServer = async (options) => {
  if (server) {
    server.close();
  }
  server = (await createDevServer(options, applyPlugins)).server;
  return server;
};
export {
  closeServer,
  createServer,
  getServer,
  setServer
};
