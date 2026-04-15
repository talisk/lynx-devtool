const parsedJSONFromElement = (id) => {
  const elements = document.querySelectorAll(`#${id}`);
  if (elements.length === 0) {
    return void 0;
  }
  const element = elements[elements.length - 1];
  if (element) {
    try {
      const parsed = JSON.parse((element === null || element === void 0 ? void 0 : element.textContent) || "");
      return parsed;
    } catch (e) {
      console.error(`parse ${id} error`, e);
      return void 0;
    }
  }
  return void 0;
};
export {
  parsedJSONFromElement
};
