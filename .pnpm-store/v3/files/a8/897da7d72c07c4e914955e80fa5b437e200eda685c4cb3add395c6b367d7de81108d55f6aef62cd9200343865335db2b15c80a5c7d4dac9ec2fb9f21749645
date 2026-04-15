import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { Stream } from "stream";
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
  createReadableStreamFromReadable
};
