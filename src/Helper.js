/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

export function _typeof(obj) {
    for (var i = 1; obj && i < arguments.length; ++i) {
        if(typeof obj[arguments[i]] =='undefined'){
            return false;
        }
        obj = obj[arguments[i]]
    }
    return obj;
}

export function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent(etype, false, true);
        el.dispatchEvent(evObj);
    }
}

export  default  _typeof;