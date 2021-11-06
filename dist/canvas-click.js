(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["canvas-click"] = factory());
})(this, (function () { 'use strict';

    function findKeyOfArrayMap(map, el) {
        for (var key in map) {
            if (map[key].includes(el)) {
                return key;
            }
        }
        return undefined;
    }
    var CanvasClickEventMap = {
        start: ["mousedown", "touchstart"],
        move: ["mousemove", "touchmove"],
        end: ["mouseup", "touchend", "touchcancel"]
    };
    var CanvasClick = /** @class */ (function () {
        function CanvasClick(identifier, pageX, pageY, x, y) {
            this.identifier = identifier;
            this.pageX = pageX;
            this.pageY = pageY;
            this.x = x;
            this.y = y;
        }
        CanvasClick.addClickListener = function (types, canvas, listener, target) {
            if (target === void 0) { target = canvas; }
            for (var _i = 0, _a = types instanceof Array ? types : [types]; _i < _a.length; _i++) {
                var type = _a[_i];
                for (var _b = 0, _c = CanvasClickEventMap[type]; _b < _c.length; _b++) {
                    var eventType = _c[_b];
                    target.addEventListener(eventType, CanvasClick.wrap(canvas, listener));
                }
            }
        };
        CanvasClick.wrap = function (canvas, listener, thisArgs) {
            return function (event) {
                var type = findKeyOfArrayMap(CanvasClickEventMap, event.type);
                if (type === undefined) {
                    throw new Error("Unknown event type: " + event.type);
                }
                if (event instanceof MouseEvent) {
                    if (event.button === 0) {
                        listener.call(thisArgs, CanvasClick.from(canvas, event), type);
                    }
                }
                else if (event instanceof TouchEvent) {
                    var length_1 = event.changedTouches.length;
                    for (var i = 0; i < length_1; ++i) {
                        listener.call(thisArgs, CanvasClick.from(canvas, event.changedTouches[i]), type);
                    }
                }
            };
        };
        CanvasClick.from = function (canvas, clickInfo) {
            var _a;
            var canvasBounds = canvas.getBoundingClientRect();
            return new CanvasClick((_a = clickInfo.identifier) !== null && _a !== void 0 ? _a : 0, clickInfo.pageX, clickInfo.pageY, (clickInfo.pageX - canvasBounds.left - window.scrollX) / (canvas.clientWidth / (canvas.width || canvas.clientWidth)), (clickInfo.pageY - canvasBounds.top - window.scrollY) / (canvas.clientHeight / (canvas.height || canvas.clientHeight)));
        };
        return CanvasClick;
    }());

    return CanvasClick;

}));
//# sourceMappingURL=canvas-click.js.map
