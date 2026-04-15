class RouterAPI {
  redirect(url, status = 302) {
    this.url = url;
    this.status = status;
  }
  rewrite(entryName) {
    this.current = entryName;
  }
  use(entryName) {
    this.rewrite(entryName);
  }
  constructor(entryName) {
    this.current = entryName;
    this.status = 200;
    this.url = "";
  }
}
export {
  RouterAPI
};
