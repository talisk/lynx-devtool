import { isRouteErrorResponse, json } from "@modern-js/runtime-utils/remix-router";
function sanitizeError(error) {
  if (error instanceof Error && process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
    const sanitized = new Error("Unexpected Server Error");
    sanitized.stack = void 0;
    return sanitized;
  }
  return error;
}
function sanitizeErrors(errors) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => {
    return Object.assign(acc, {
      [routeId]: sanitizeError(error)
    });
  }, {});
}
function serializeError(error) {
  const sanitized = sanitizeError(error);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors(errors) {
  if (!errors) {
    return null;
  }
  const entries = Object.entries(errors);
  const serialized = {};
  for (const [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    } else if (val instanceof Error) {
      const sanitized = sanitizeError(val);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function errorResponseToJson(errorResponse) {
  return json(
    // @ts-expect-error This is "private" from users but intended for internal use
    serializeError(errorResponse.error || new Error("Unexpected Server Error")),
    {
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: {
        "X-Modernjs-Error": "yes"
      }
    }
  );
}
export {
  errorResponseToJson,
  sanitizeError,
  sanitizeErrors,
  serializeError,
  serializeErrors
};
