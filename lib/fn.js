/* @flow weak */
"use strict";

var FMap = require("./finitemap.js");
var primitive = require("./primitive.js");
var shrink = require("./shrink.js");
var utils = require("./utils.js");

/**
  - `fn(arb: arbitrary a): arbitrary (b -> a)`
  - `fun(arb: arbitrary a): arbitrary (b -> a)`
*/

function fn(arb) {
  arb = utils.force(arb || primitive.json);

  return {
    generator: function (size) {
      var m = new FMap();

      var f = function (arg) {
        if (!m.contains(arg)) {
          var value = arb.generator(size);
          m.insert(arg, value);
        }

        return m.get(arg);
      };

      f.internalMap = m;
      return f;
    },

    shrink: shrink.noop,
    show: function (f) {
      return "[" + f.internalMap.data.map(function (item) {
        return "" + item[0] + ": " + arb.show(item[1]);
      }).join(", ") + "]";
    }
  };
}

module.exports = {
  fn: fn,
  fun: fn,
};
