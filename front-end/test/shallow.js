export const search = (tree, fulfillCondition) => {
    let element = null;

    if (fulfillCondition(tree)) {
        return tree;
    } else {
        const children = tree && tree.props && tree.props.children; 

        if (!children) {
            return null;
        } 

        if (Array.isArray(children)) {
            children.forEach((child) => {
                if (fulfillCondition(child)) {
                    element = child;
                }
            })
        } else {
            if (fulfillCondition(children)) {
                element = children;
            }
        }

        let newElement = null;
        if (!element) {
            if (Array.isArray(children)) {
                children.forEach((child) => {
                    newElement = search(child, fulfillCondition);
                    if (newElement) {
                        element = newElement;
                    }
                });
            } else {
                newElement = search(children, fulfillCondition);
                if (newElement) {
                    element = newElement;
                }
            } 
        }

        return element;
    }
}

export const searchWithClass = (tree, className) => {
    return search(tree, (el) => {
        if (!el || !el.props || !el.props.className) {
            return null;
        }

        if (el.props.className.indexOf(className) >= 0) {
            return el;
        } 

        return null;
    });
} 

export const searchWithId = (tree, id) => {
    return search(tree, (el) => {
        if (!el || !el.props || !el.props.id) {
            return null;
        }

        if (el.props.id.trim() === id.trim()) {
            return el;
        } 

        return null;
    });
} 
