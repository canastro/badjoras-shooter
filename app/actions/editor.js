import esprima from 'esprima';
import traverse from 'ast-traverse';

export const STORE_CODE = 'STORE_CODE';

export const submitCode = code => (dispatch) => {
    const ast = esprima.parse(code);
    const actions = {};
    let id = 0;

    traverse(ast, {
        pre: (node) => {
            if (node.type === 'CallExpression') {
                actions[id] = {
                    id,
                    type: node.callee.name,
                    args: node.arguments.map((arg) => {
                        if (arg.type === 'Literal') {
                            return arg.value;
                        }

                        return Number(`${arg.operator}${arg.argument.value}`);
                    })
                };

                id += 1;
            }
        },
        skipProperty: prop => prop === 'parent'
    });


    return dispatch({ type: STORE_CODE, actions });
};
