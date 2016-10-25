/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const TinyMceHandle = class{
    constructor(Element,Dispatcher){
        this.Element = Element;
        this.Dispatcher = Dispatcher;
    }
    onBlur(Message){
        this.Dispatcher.SendMessage('tinyMceHandle_blur',Message);
    }
    onChange(Message){
        this.Dispatcher.SendMessage('tinyMceHandle_change',Message);
    }
};

export default TinyMceHandle;