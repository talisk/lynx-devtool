class CompilerErrorResult {
  init(initErrorResult) {
    this._messageDetails = (initErrorResult === null || initErrorResult === void 0 ? void 0 : initErrorResult.messageDetails) || [];
  }
  update(messageDetails) {
    for (const messageDetail of messageDetails) {
      const addError = !this._messageDetails.some((detail) => {
        if (detail.filename === messageDetail.filename) {
          detail.content = messageDetail.content;
          return true;
        }
        return false;
      });
      if (addError) {
        this._messageDetails.push(messageDetail);
      }
    }
  }
  removeByFileName(filename) {
    this._messageDetails = this._messageDetails.filter((detail) => detail.filename !== filename);
  }
  get value() {
    var _this__messageDetails;
    return {
      code: 1,
      message: `Compilation failure ${(_this__messageDetails = this._messageDetails) === null || _this__messageDetails === void 0 ? void 0 : _this__messageDetails.length} files with Babel.`,
      messageDetails: this._messageDetails
    };
  }
  checkExistError() {
    return this._messageDetails.length > 0;
  }
  constructor(initErrorResult) {
    this.init(initErrorResult);
  }
}
export {
  CompilerErrorResult
};
