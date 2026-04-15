import { _ as _async_iterator } from "@swc/helpers/_/_async_iterator";
import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { Stream } from "node:stream";
function writeReadableStreamToWritable(stream, writable) {
  return _writeReadableStreamToWritable.apply(this, arguments);
}
function _writeReadableStreamToWritable() {
  _writeReadableStreamToWritable = _async_to_generator(function(stream, writable) {
    var reader, flushable, error;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          reader = stream.getReader();
          flushable = writable;
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            3,
            ,
            4
          ]);
          return [
            4,
            new Promise(function(resolve, reject) {
              writable.on("finish", resolve);
              writable.on("error", reject);
              var writeAndFlush = function() {
                var _ref = _async_to_generator(function() {
                  var _ref2, done, value;
                  return _ts_generator(this, function(_state2) {
                    switch (_state2.label) {
                      case 0:
                        if (false)
                          return [
                            3,
                            2
                          ];
                        return [
                          4,
                          reader.read()
                        ];
                      case 1:
                        _ref2 = _state2.sent(), done = _ref2.done, value = _ref2.value;
                        if (done) {
                          writable.end();
                          return [
                            3,
                            2
                          ];
                        }
                        writable.write(value);
                        if (typeof flushable.flush === "function") {
                          flushable.flush();
                        }
                        return [
                          3,
                          0
                        ];
                      case 2:
                        return [
                          2
                        ];
                    }
                  });
                });
                return function writeAndFlush2() {
                  return _ref.apply(this, arguments);
                };
              }();
              writeAndFlush().catch(reject);
            })
          ];
        case 2:
          _state.sent();
          return [
            3,
            4
          ];
        case 3:
          error = _state.sent();
          writable.destroy(error);
          throw error;
        case 4:
          return [
            2
          ];
      }
    });
  });
  return _writeReadableStreamToWritable.apply(this, arguments);
}
function writeAsyncIterableToWritable(iterable, writable) {
  return _writeAsyncIterableToWritable.apply(this, arguments);
}
function _writeAsyncIterableToWritable() {
  _writeAsyncIterableToWritable = _async_to_generator(function(iterable, writable) {
    var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, err, error;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          _state.trys.push([
            0,
            13,
            ,
            14
          ]);
          _iteratorAbruptCompletion = false, _didIteratorError = false;
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            6,
            7,
            12
          ]);
          _iterator = _async_iterator(iterable);
          _state.label = 2;
        case 2:
          return [
            4,
            _iterator.next()
          ];
        case 3:
          if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done))
            return [
              3,
              5
            ];
          _value = _step.value;
          chunk = _value;
          writable.write(chunk);
          _state.label = 4;
        case 4:
          _iteratorAbruptCompletion = false;
          return [
            3,
            2
          ];
        case 5:
          return [
            3,
            12
          ];
        case 6:
          err = _state.sent();
          _didIteratorError = true;
          _iteratorError = err;
          return [
            3,
            12
          ];
        case 7:
          _state.trys.push([
            7,
            ,
            10,
            11
          ]);
          if (!(_iteratorAbruptCompletion && _iterator.return != null))
            return [
              3,
              9
            ];
          return [
            4,
            _iterator.return()
          ];
        case 8:
          _state.sent();
          _state.label = 9;
        case 9:
          return [
            3,
            11
          ];
        case 10:
          if (_didIteratorError) {
            throw _iteratorError;
          }
          return [
            7
          ];
        case 11:
          return [
            7
          ];
        case 12:
          writable.end();
          return [
            3,
            14
          ];
        case 13:
          error = _state.sent();
          writable.destroy(error);
          throw error;
        case 14:
          return [
            2
          ];
      }
    });
  });
  return _writeAsyncIterableToWritable.apply(this, arguments);
}
function readableStreamToString(stream, encoding) {
  return _readableStreamToString.apply(this, arguments);
}
function _readableStreamToString() {
  _readableStreamToString = _async_to_generator(function(stream, encoding) {
    var reader, chunks, _ref, done, value;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          reader = stream.getReader();
          chunks = [];
          _state.label = 1;
        case 1:
          if (false)
            return [
              3,
              3
            ];
          return [
            4,
            reader.read()
          ];
        case 2:
          _ref = _state.sent(), done = _ref.done, value = _ref.value;
          if (done) {
            return [
              3,
              3
            ];
          }
          if (value) {
            chunks.push(value);
          }
          return [
            3,
            1
          ];
        case 3:
          return [
            2,
            Buffer.concat(chunks).toString(encoding)
          ];
      }
    });
  });
  return _readableStreamToString.apply(this, arguments);
}
var createReadableStreamFromReadable = function(source) {
  var pump = new StreamPump(source);
  var stream = new ReadableStream(pump, pump);
  return stream;
};
var StreamPump = /* @__PURE__ */ function() {
  "use strict";
  function StreamPump2(stream) {
    _class_call_check(this, StreamPump2);
    this.highWaterMark = stream.readableHighWaterMark || new Stream.Readable().readableHighWaterMark;
    this.accumalatedSize = 0;
    this.stream = stream;
    this.enqueue = this.enqueue.bind(this);
    this.error = this.error.bind(this);
    this.close = this.close.bind(this);
  }
  var _proto = StreamPump2.prototype;
  _proto.size = function size(chunk) {
    return (chunk === null || chunk === void 0 ? void 0 : chunk.byteLength) || 0;
  };
  _proto.start = function start(controller) {
    this.controller = controller;
    this.stream.on("data", this.enqueue);
    this.stream.once("error", this.error);
    this.stream.once("end", this.close);
    this.stream.once("close", this.close);
  };
  _proto.pull = function pull() {
    this.resume();
  };
  _proto.cancel = function cancel(reason) {
    if (this.stream.destroy) {
      this.stream.destroy(reason);
    }
    this.stream.off("data", this.enqueue);
    this.stream.off("error", this.error);
    this.stream.off("end", this.close);
    this.stream.off("close", this.close);
  };
  _proto.enqueue = function enqueue(chunk) {
    if (this.controller) {
      try {
        var bytes = _instanceof(chunk, Uint8Array) ? chunk : Buffer.from(chunk);
        var available = (this.controller.desiredSize || 0) - bytes.byteLength;
        this.controller.enqueue(bytes);
        if (available <= 0) {
          this.pause();
        }
      } catch (error) {
        this.controller.error(new Error("Could not create Buffer, chunk must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object"));
        this.cancel();
      }
    }
  };
  _proto.pause = function pause() {
    if (this.stream.pause) {
      this.stream.pause();
    }
  };
  _proto.resume = function resume() {
    if (this.stream.readable && this.stream.resume) {
      this.stream.resume();
    }
  };
  _proto.close = function close() {
    if (this.controller) {
      this.controller.close();
      delete this.controller;
    }
  };
  _proto.error = function error(error) {
    if (this.controller) {
      this.controller.error(error);
      delete this.controller;
    }
  };
  return StreamPump2;
}();
export {
  createReadableStreamFromReadable,
  readableStreamToString,
  writeAsyncIterableToWritable,
  writeReadableStreamToWritable
};
