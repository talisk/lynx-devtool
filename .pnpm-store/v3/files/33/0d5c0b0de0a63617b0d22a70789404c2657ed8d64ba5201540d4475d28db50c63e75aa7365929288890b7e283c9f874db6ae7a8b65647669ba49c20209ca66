var _async_to_generator = require("@swc/helpers/_/_async_to_generator");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _ts_generator = require("@swc/helpers/_/_ts_generator");
var fs = require("node:fs/promises");
var path = require("node:path");
var createProdServer = require("@modern-js/prod-server").createProdServer;
p_genPluginImportsCode;
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}
function loadRoutes(routeFilepath) {
  return _loadRoutes.apply(this, arguments);
}
function _loadRoutes() {
  _loadRoutes = _async_to_generator._(function(routeFilepath) {
    var content, routeSpec, error;
    return _ts_generator._(this, function(_state) {
      switch (_state.label) {
        case 0:
          _state.trys.push([
            0,
            3,
            ,
            4
          ]);
          return [
            4,
            fs.access(routeFilepath)
          ];
        case 1:
          _state.sent();
          return [
            4,
            fs.readFile(routeFilepath, "utf-8")
          ];
        case 2:
          content = _state.sent();
          routeSpec = JSON.parse(content);
          return [
            2,
            routeSpec.routes || []
          ];
        case 3:
          error = _state.sent();
          console.warn("route.json not found or invalid, continuing with empty routes.");
          return [
            2,
            []
          ];
        case 4:
          return [
            2
          ];
      }
    });
  });
  return _loadRoutes.apply(this, arguments);
}
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _async_to_generator._(function() {
    var routeFilepath, routes, dynamicProdOptions, prodServerOptions, app, port;
    return _ts_generator._(this, function(_state) {
      switch (_state.label) {
        case 0:
          routeFilepath = path.join(__dirname, p_ROUTE_SPEC_FILE);
          return [
            4,
            loadRoutes(routeFilepath)
          ];
        case 1:
          routes = _state.sent();
          dynamicProdOptions = p_dynamicProdOptions;
          prodServerOptions = _object_spread._({
            pwd: __dirname,
            routes,
            disableCustomHook: true,
            appContext: {
              sharedDirectory: p_sharedDirectory,
              apiDirectory: p_apiDirectory,
              lambdaDirectory: p_lambdaDirectory
            },
            plugins: p_plugins
          }, dynamicProdOptions);
          return [
            4,
            createProdServer(prodServerOptions)
          ];
        case 2:
          app = _state.sent();
          port = process.env.PORT || 8080;
          app.listen({
            host: "::",
            port
          }, function() {
            console.log("\x1B[32mServer is listening on http://[::]:".concat(port), "\x1B[0m");
          });
          return [
            2
          ];
      }
    });
  });
  return _main.apply(this, arguments);
}
main();
