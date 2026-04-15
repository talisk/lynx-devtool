function createTransformStream(fn) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  return new TransformStream({
    async transform(chunk, controller) {
      const content = decoder.decode(chunk);
      const newContent = fn ? await fn(content) : content;
      controller.enqueue(encoder.encode(newContent));
    }
  });
}
function transformResponse(response, transformCb) {
  let readable = null;
  if (response.body) {
    const stream = createTransformStream(async (before) => {
      if (Array.isArray(transformCb)) {
        return transformCb.reduce(async (before2, cb) => {
          return cb(await before2);
        }, Promise.resolve(before));
      } else {
        return transformCb(before);
      }
    });
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
