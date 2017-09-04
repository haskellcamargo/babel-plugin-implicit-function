'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var hasNoImplicitFunction = function hasNoImplicitFunction(path) {
    return !!path.findParent(function (_ref) {
        var node = _ref.node;
        return node.directives && node.directives.some(function (_ref2) {
            var value = _ref2.value;
            return value.value === 'no implicit function';
        });
    });
};

exports.default = function (_ref3) {
    var t = _ref3.types;
    return {
        visitor: {
            UnaryExpression: function UnaryExpression(path) {
                if (!path.isUnaryExpression({ operator: '~' }) || hasNoImplicitFunction(path)) {
                    return;
                }

                var wrapper = t.arrowFunctionExpression([], path.node.argument);
                path.replaceWith(wrapper);
            }
        }
    };
};
