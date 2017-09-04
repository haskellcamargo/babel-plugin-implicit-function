const hasNoImplicitFunction = path =>
    !!path.findParent(({ node }) =>
        node.directives && node.directives.some(({ value }) => value.value === 'no implicit function'));

export default ({ types: t }) => ({
    visitor: {
        UnaryExpression(path) {
            if (!path.isUnaryExpression({ operator: '~' }) || hasNoImplicitFunction(path)) {
                return;
            }

            const wrapper = t.arrowFunctionExpression([], path.node.argument);
            path.replaceWith(wrapper);
        }
    }
});

