"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stream_exports = {};
__export(stream_exports, {
  createReadableStreamFromReadable: () => createReadableStreamFromReadable,
  readableStreamToString: () => readableStreamToString,
  writeAsyncIterableToWritable: () => writeAsyncIterableToWritable,
  writeReadableStreamToWritable: () => writeReadableStreamToWritable
});
module.exports = __toCommonJS(stream_exports);
var import_node_stream = require("node:stream");
async function writeReadableStreamToWritable(stream, writable) {
  const reader = stream.getReader();
  const flushable = writable;
  try {
    await new Promise((resolve, reject) => {
      writable.on("finish", resolve);
      writable.on("error", reject);
      const writeAndFlush = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            writable.end();
            break;
          }
          writable.write(value);
          if (typeof flushable.flush === "function") {
            flushable.flush();
          }
        }
      };
      writeAndFlush().catch(reject);
    });
  } catch (error) {
    writable.destroy(error);
    throw error;
  }
}
async function writeAsyncIterableToWritable(iterable, writable) {
  try {
    for await (const chunk of iterable) {
      writable.write(chunk);
    }
    writable.end();
  } catch (error) {
    writable.destroy(error);
    throw error;
  }
}
async function readableStreamToString(stream, encoding) {
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    if (value) {
      chunks.push(value);
    }
  }
  return Buffer.concat(chunks).toString(encoding);
}
const createReadableStreamFromReadable = (source) => {
  const pump = new StreamPump(source);
  const stream = new ReadableStream(pump, pump);
  return stream;
};
class StreamPump {
  size(chunk) {
    return (chunk === null || chunk === void 0 ? void 0 : chunk.byteLength) || 0;
  }
  start(controller) {
    this.controller = controller;
    this.stream.on("data", this.enqueue);
    this.stream.once("error", this.error);
    this.stream.once("end", this.close);
    this.stream.once("close", this.close);
  }
  pull() {
    this.resume();
  }
  cancel(reason) {
    if (this.stream.destroy) {
      this.stream.destroy(reason);
    }
    this.stream.off("data", this.enqueue);
    this.stream.off("error", this.error);
    this.stream.off("end", this.close);
    this.stream.off("close", this.close);
  }
  enqueue(chunk) {
    if (this.controller) {
      try {
        const bytes = chunk instanceof Uint8Array ? chunk : Buffer.from(chunk);
        const available = (this.controller.desiredSize || 0) - bytes.byteLength;
        this.controller.enqueue(bytes);
        if (available <= 0) {
          this.pause();
        }
      } catch (error) {
        this.controller.error(new Error("Could not create Buffer, chunk must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object"));
        this.cancel();
      }
    }
  }
  pause() {
    if (this.stream.pause) {
      this.stream.pause();
    }
  }
  resume() {
    if (this.stream.readable && this.stream.resume) {
      this.stream.resume();
    }
  }
  close() {
    if (this.controller) {
      this.controller.close();
      delete this.controller;
    }
  }
  error(error) {
    if (this.controller) {
      this.controller.error(error);
      delete this.controller;
    }
  }
  constructor(stream) {
    this.highWaterMark = stream.readableHighWaterMark || new import_node_stream.Stream.Readable().readableHighWaterMark;
    this.accumalatedSize = 0;
    this.stream = stream;
    this.enqueue = this.enqueue.bind(this);
    this.error = this.error.bind(this);
    this.close = this.close.bind(this);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createReadableStreamFromReadable,
  readableStreamToString,
  writeAsyncIterableToWritable,
  writeReadableStreamToWritable
});
