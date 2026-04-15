import { _ as _call_super } from "@swc/helpers/_/_call_super";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _create_class } from "@swc/helpers/_/_create_class";
import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _inherits } from "@swc/helpers/_/_inherits";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import React, { createElement } from "react";
import withSideEffect from "react-side-effect";
import { aggKeysFromPropsList, aggMatchesFromPropsList, exist, getOutermostProperty } from "./util";
var PROP_NAMES = {
  INTERVAL: "interval",
  STALE_LIMIT: "staleLimit",
  LEVEL: "level",
  INCLUDES: "includes",
  EXCLUDES: "excludes",
  FALLBACK: "fallback",
  MATCHES: "matches"
};
var handleClientStateChange = function() {
};
var mapStateOnServer = function(reduceProps) {
  var defaultProps = {
    interval: 10,
    staleLimit: false,
    level: 0,
    includes: null,
    excludes: null,
    fallback: false,
    matches: null
  };
  return Object.keys(defaultProps).reduce(function(props, key) {
    var propKey = key;
    var reduceProp = reduceProps[propKey];
    var nextProps = props;
    if (exist(reduceProp)) {
      nextProps = _object_spread_props(_object_spread({}, props), _define_property({}, propKey, reduceProp));
    }
    return nextProps;
  }, defaultProps);
};
var reducePropsToState = function(propsList) {
  var reduceProps = {
    interval: getOutermostProperty(propsList, PROP_NAMES.INTERVAL),
    staleLimit: getOutermostProperty(propsList, PROP_NAMES.STALE_LIMIT),
    level: getOutermostProperty(propsList, PROP_NAMES.LEVEL),
    includes: aggKeysFromPropsList(propsList, PROP_NAMES.INCLUDES),
    excludes: aggKeysFromPropsList(propsList, PROP_NAMES.EXCLUDES),
    fallback: getOutermostProperty(propsList, PROP_NAMES.FALLBACK),
    matches: aggMatchesFromPropsList(propsList, PROP_NAMES.MATCHES)
  };
  return reduceProps;
};
function factory(Component) {
  var Spr = /* @__PURE__ */ function(_React_Component) {
    "use strict";
    _inherits(Spr2, _React_Component);
    function Spr2() {
      _class_call_check(this, Spr2);
      return _call_super(this, Spr2, arguments);
    }
    var _proto = Spr2.prototype;
    _proto.verify = function verify() {
      return true;
    };
    _proto.render = function render() {
      var newProps = _object_spread({}, this.props);
      var validate = this.verify();
      if (!validate) {
        throw new Error("invalid props, check usage");
      }
      if (process.env.NODE_ENV === "development") {
        console.error("[Warn] PreRender has been deprecated, please use SSR Cache instead. reference to docs: https://modernjs.dev/guides/advanced-features/ssr.html");
      }
      return createElement(Component, _object_spread({}, newProps));
    };
    _create_class(Spr2, null, [
      {
        key: "canUseDOM",
        get: function get() {
          return Component.canUseDOM;
        },
        set: function set(canUseDOM) {
          Component.canUseDOM = canUseDOM;
        }
      }
    ]);
    return Spr2;
  }(React.Component);
  Spr.peek = Component.peek;
  Spr.rewind = Component.rewind;
  Spr.config = function() {
    var mappedState = Component.rewind();
    return mappedState;
  };
  return Spr;
}
var NullComponent = function() {
  return null;
};
var SprSideEffects = withSideEffect(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
var PreRender = factory(SprSideEffects);
export {
  PreRender
};
