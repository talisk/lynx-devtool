function warmup(bundles) {
  bundles.forEach((bundle) => {
    bundle && import(bundle).catch((_) => {
    });
  });
}
export {
  warmup
};
