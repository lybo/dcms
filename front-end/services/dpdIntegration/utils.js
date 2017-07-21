export function dpdHandler(resolve, reject) {
    return (mapper) => (data, err) => {
        if (err) {
            reject(err);
            return;
        };

        const mappedData = mapper ?
            mapper(data) :
            data;

        resolve(mappedData);
    };
};

export function dpdDelHandler(resolve, reject) {
    return (mapper) => (result) => {
        if (!result || result.count === 0) {
            reject({
                errors: 'delete action failed'
            });
        };

        const mappedData = mapper ?
            mapper(data) :
            data;

        resolve(mappedData);
    };
};

