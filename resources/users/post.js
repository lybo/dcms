dpd.configuration.get(function (result, err) {
    if (result.length === 0) {
        dpd.configuration.post({"hasAdmin": true});        
    }
});
