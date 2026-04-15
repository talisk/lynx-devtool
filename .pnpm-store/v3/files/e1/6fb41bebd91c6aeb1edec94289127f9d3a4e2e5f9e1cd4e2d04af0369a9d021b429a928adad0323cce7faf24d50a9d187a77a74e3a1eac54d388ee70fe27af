import { AbortedDeferredError, UNSAFE_DeferredData as DeferredData } from "@modern-js/runtime-utils/remix-router";
const DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
async function parseDeferredReadableStream(stream) {
  if (!stream) {
    throw new Error("parseDeferredReadableStream requires stream argument");
  }
  let deferredData;
  const deferredResolvers = {};
  try {
    const sectionReader = readStreamSections(stream);
    const initialSectionResult = await sectionReader.next();
    const initialSection = initialSectionResult.value;
    if (!initialSection) {
      throw new Error("no critical data");
    }
    const criticalData = JSON.parse(initialSection);
    if (typeof criticalData === "object" && criticalData !== null) {
      for (const [eventKey, value] of Object.entries(criticalData)) {
        if (typeof value !== "string" || !value.startsWith(DEFERRED_VALUE_PLACEHOLDER_PREFIX)) {
          continue;
        }
        deferredData = deferredData || {};
        deferredData[eventKey] = new Promise((resolve, reject) => {
          deferredResolvers[eventKey] = {
            resolve: (value2) => {
              resolve(value2);
              delete deferredResolvers[eventKey];
            },
            reject: (error) => {
              reject(error);
              delete deferredResolvers[eventKey];
            }
          };
        });
      }
    }
    (async () => {
      try {
        for await (const section of sectionReader) {
          const [event, ...sectionDataStrings] = section.split(":");
          const sectionDataString = sectionDataStrings.join(":");
          const data = JSON.parse(sectionDataString);
          if (event === "data") {
            for (const [key, value] of Object.entries(data)) {
              if (deferredResolvers[key]) {
                deferredResolvers[key].resolve(value);
              }
            }
          } else if (event === "error") {
            for (const [key, value] of Object.entries(data)) {
              const err = new Error(value.message);
              err.stack = value.stack;
              if (deferredResolvers[key]) {
                deferredResolvers[key].reject(err);
              }
            }
          }
        }
        for (const [key, resolver] of Object.entries(deferredResolvers)) {
          resolver.reject(new AbortedDeferredError(`Deferred ${key} will never resolved`));
        }
      } catch (error) {
        for (const resolver of Object.values(deferredResolvers)) {
          resolver.reject(error);
        }
      }
    })();
    return new DeferredData({
      ...criticalData,
      ...deferredData
    });
  } catch (error) {
    for (const resolver of Object.values(deferredResolvers)) {
      resolver.reject(error);
    }
    throw error;
  }
}
async function* readStreamSections(stream) {
  const reader = stream.getReader();
  let buffer = [];
  let sections = [];
  let closed = false;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const readStreamSection = async () => {
    if (sections.length > 0) {
      return sections.shift();
    }
    while (!closed && sections.length === 0) {
      const chunk = await reader.read();
      if (chunk.done) {
        closed = true;
        break;
      }
      buffer.push(chunk.value);
      try {
        const bufferedString = decoder.decode(mergeArrays(...buffer));
        const splitSections = bufferedString.split("\n\n");
        if (splitSections.length >= 2) {
          sections.push(...splitSections.slice(0, -1));
          buffer = [
            encoder.encode(splitSections.slice(-1).join("\n\n"))
          ];
        }
        if (sections.length > 0) {
          break;
        }
      } catch {
        continue;
      }
    }
    if (sections.length > 0) {
      return sections.shift();
    }
    if (buffer.length > 0) {
      const bufferedString = decoder.decode(mergeArrays(...buffer));
      sections = bufferedString.split("\n\n").filter((s) => s);
      buffer = [];
    }
    return sections.shift();
  };
  let section = await readStreamSection();
  while (section) {
    yield section;
    section = await readStreamSection();
  }
}
function mergeArrays(...arrays) {
  const out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0));
  let offset = 0;
  for (const arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }
  return out;
}
export {
  parseDeferredReadableStream
};
