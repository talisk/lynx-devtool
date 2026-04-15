import { FormData as NodeFormData, Headers as NodeHeaders, Request as NodeRequest, Response as NodeResponse } from "@web-std/fetch";
import { Blob as NodeBlob, File as NodeFile } from "@web-std/file";
import { ReadableStream as NodeReadableStream, TransformStream as NodeTransformStream, WritableStream as NodeWritableStream } from "@web-std/stream";
if (!Object.getOwnPropertyDescriptor(NodeHeaders.prototype, "getSetCookie")) {
  Object.defineProperty(NodeHeaders.prototype, "getSetCookie", {
    value: function getSetCookie() {
      var cookies = [];
      this.forEach(function(value, name) {
        if (name.toLowerCase() === "set-cookie") {
          cookies.push(value);
        }
      });
      return cookies;
    }
  });
}
var installGlobals = function() {
  if (!global.Headers) {
    global.Headers = NodeHeaders;
  }
  if (!global.Request) {
    global.Request = NodeRequest;
  }
  if (!global.Response) {
    global.Response = NodeResponse;
  }
  if (!global.FormData) {
    global.FormData = NodeFormData;
  }
  if (!global.TransformStream) {
    global.TransformStream = NodeTransformStream;
  }
  if (!global.ReadableStream) {
    global.ReadableStream = NodeReadableStream;
  }
  if (!global.WritableStream) {
    global.WritableStream = NodeWritableStream;
  }
  if (!global.File) {
    global.File = NodeFile;
  }
  if (!global.Blob) {
    global.Blob = NodeBlob;
  }
};
export {
  installGlobals
};
