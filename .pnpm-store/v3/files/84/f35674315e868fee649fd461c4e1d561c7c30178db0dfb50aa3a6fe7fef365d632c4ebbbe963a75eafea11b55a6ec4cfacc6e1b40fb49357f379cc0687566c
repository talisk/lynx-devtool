function warmup(bundles) {
  bundles.forEach(function(bundle) {
    bundle && import(bundle).catch(function(_) {
    });
  });
}
export {
  warmup
};
