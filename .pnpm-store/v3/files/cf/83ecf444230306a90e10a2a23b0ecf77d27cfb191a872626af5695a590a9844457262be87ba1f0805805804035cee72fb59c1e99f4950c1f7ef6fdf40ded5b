function sortByUrlPath(entries) {
  entries.sort(function(a, b) {
    var length1 = a.urlPath.length;
    var length2 = b.urlPath.length;
    if (length1 < length2) {
      return 1;
    }
    if (length1 > length2) {
      return -1;
    }
    return 0;
  });
  return entries;
}
var matchEntry = function(pathname, entries) {
  sortByUrlPath(entries);
  return entries.find(function(entry) {
    return pathname.startsWith(entry.urlPath);
  });
};
export {
  matchEntry
};
