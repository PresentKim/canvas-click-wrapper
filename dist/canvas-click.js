(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["canvas-click"] = factory());
})(this, (function () { 'use strict';

    var CanvasClick = /** @class */ (function () {
        function CanvasClick() {
        }
        return CanvasClick;
    }());

    return CanvasClick;

}));
//# sourceMappingURL=canvas-click.js.map
