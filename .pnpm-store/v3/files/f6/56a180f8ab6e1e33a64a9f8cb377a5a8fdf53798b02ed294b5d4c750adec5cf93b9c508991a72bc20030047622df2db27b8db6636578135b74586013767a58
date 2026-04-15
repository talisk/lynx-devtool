import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
function createTransformStream(fn) {
  var decoder = new TextDecoder();
  var encoder = new TextEncoder();
  return new TransformStream({
    transform: function transform(chunk, controller) {
      return _async_to_generator(function() {
        var content, newContent, _tmp;
        return _ts_generator(this, function(_state) {
          switch (_state.label) {
            case 0:
              content = decoder.decode(chunk);
              if (!fn)
                return [
                  3,
                  2
                ];
              return [
                4,
                fn(content)
              ];
            case 1:
              _tmp = _state.sent();
              return [
                3,
                3
              ];
            case 2:
              _tmp = content;
              _state.label = 3;
            case 3:
              newContent = _tmp;
              controller.enqueue(encoder.encode(newContent));
              return [
                2
              ];
          }
        });
      })();
    }
  });
}
function transformResponse(response, transformCb) {
  var readable = null;
  if (response.body) {
    var stream = createTransformStream(function() {
      var _ref = _async_to_generator(function(before) {
        return _ts_generator(this, function(_state) {
          if (Array.isArray(transformCb)) {
            return [
              2,
              transformCb.reduce(function() {
                var _ref2 = _async_to_generator(function(before2, cb) {
                  return _ts_generator(this, function(_state2) {
                    switch (_state2.label) {
                      case 0:
                        return [
                          4,
                          before2
                        ];
                      case 1:
                        return [
                          2,
                          cb.apply(void 0, [
                            _state2.sent()
                          ])
                        ];
                    }
                  });
                });
                return function(before2, cb) {
                  return _ref2.apply(this, arguments);
                };
              }(), Promise.resolve(before))
            ];
          } else {
            return [
              2,
              transformCb(before)
            ];
          }
          return [
            2
          ];
        });
      });
      return function(before) {
        return _ref.apply(this, arguments);
      };
    }());
    response.body.pipeThrough(stream);
    readable = stream.readable;
  }
  return new Response(readable, {
    status: response.status,
    headers: response.headers,
    statusText: response.statusText
  });
}
export {
  createTransformStream,
  transformResponse
};
