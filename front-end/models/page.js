const page = {
    id: '0',
    title: '',
    templateId: 0,
    parentId: '',
    path: [],
    published: false,
    isMainNode: false,
    content: {},
    zIndex: 0,
};

const pageProps = Object.keys(page);

const getSanitizedProps = (data) => {
    const dataProps = Object.keys(data);
    const additionalProps = dataProps.filter((prop) => !pageProps.includes(prop));

    if (additionalProps.length) {
        console.log('Page model has additional props', additionalProps);
    }

    additionalProps.forEach(prop => delete data[prop]);

    return data;
};

export function getPage(data = {}) {
    const newData = getSanitizedProps(data);
    return Object.assign({}, page, newData);
};
