const html = (partials) => `
<!DOCTYPE html>
<html>
<head>

  ${partials.top.join("\n")}

  ${partials.head.join("\n")}

</head>

<body>
  <div id="<%= mountId %>"><!--<?- html ?>--></div>
  ${partials.body.join("\n")}
  <!--<?- chunksMap.js ?>-->
  <!--<?- SSRDataScript ?>-->
  <!--<?- bottomTemplate ?>-->
</body>

</html>
`;
export {
  html
};
