export function objectToQueryParams(paramsObject) {
    return Object
        .keys(paramsObject)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
        .join('&');
}


export function objectToArray(obj) {
    return Object.keys(obj).map(prop => [prop, obj[prop]]);
}


export function objectify(array) {
    return array.reduce(function(p, c) {
         p[c[0]] = c[1];
         return p;
    }, {});
}