function lowerFirst(str) {
    return str[0].toLowerCase() + str.slice(1);
}

module.exports = {
    camel(obj) {
        let result = {}

        for (let p in obj)
            result[lowerFirst(p)] = obj[p];

        return result;
    }
}