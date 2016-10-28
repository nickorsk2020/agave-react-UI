/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */
function _typeof(obj) {
    for (var i = 1; obj && i < arguments.length; ++i) {
        if(typeof obj[arguments[i]] =='undefined'){
            return false;
        }
        obj = obj[arguments[i]]
    }
    return obj;
}
function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent(etype, false, true);
        el.dispatchEvent(evObj);
    }
}
function deepClone(obj, hash = new WeakMap()) {
    if (Object(obj) !== obj) return obj; // primitives
    if (hash.has(obj)) return hash.get(obj); // cyclic reference
    var result = Array.isArray(obj) ? []
        : obj.constructor ? new obj.constructor() : {};
    hash.set(obj, result);
    if (obj instanceof Map)
        Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)) );
    return Object.assign(result, ...Object.keys(obj).map (
        key => ({ [key]: deepClone(obj[key], hash) }) ));
}
export { eventFire, _typeof, deepClone };