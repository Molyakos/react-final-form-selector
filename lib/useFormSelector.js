"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormSelector = void 0;
var final_form_1 = require("final-form");
var react_1 = require("react");
var react_final_form_1 = require("react-final-form");
var refEquality = function (left, right) { return left === right; };
var all = final_form_1.formSubscriptionItems.reduce(function (result, key) {
    var _a;
    return (__assign(__assign({}, result), (_a = {}, _a[key] = true, _a)));
}, {});
function useFormSelector(selector, equalityFn, _a) {
    if (equalityFn === void 0) { equalityFn = refEquality; }
    var _b = _a === void 0 ? {} : _a, _c = _b.subscription, subscription = _c === void 0 ? all : _c;
    var form = (0, react_final_form_1.useForm)('useFormState');
    var latestSelectedState = (0, react_1.useRef)();
    // synchronously register and unregister to query field state for our subscription on first render
    var _d = (0, react_1.useState)(function () {
        var initialState = {};
        form.subscribe(function (state) {
            initialState = state;
        }, subscription)();
        var newSelectedState = selector(initialState);
        latestSelectedState.current = newSelectedState;
        return newSelectedState;
    }), state = _d[0], setState = _d[1];
    (0, react_1.useEffect)(function () {
        var unsubscribe = form.subscribe(function (newState) {
            var newSelectedState = selector(newState);
            // ensure latest selected state is reused so that a custom equality function can result in identical references
            if (!equalityFn(newSelectedState, latestSelectedState.current)) {
                setState(newSelectedState);
                latestSelectedState.current = newSelectedState;
            }
        }, subscription);
        return function () {
            unsubscribe();
        };
    }, []);
    return state;
}
exports.useFormSelector = useFormSelector;
//# sourceMappingURL=useFormSelector.js.map