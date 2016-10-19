/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const TextAreaHandle = class{
    Element = null;
    Dispatcher = null;
    constructor(Element,Dispatcher){
        this.Element = Element;
        this.Dispatcher = Dispatcher;
    }
    onBlur(Message){
        this.Dispatcher.SendMessage('textarea_blur',Message);
    }
    onChange(Message){
        this.Dispatcher.SendMessage('textarea_change',Message);
    }
};

export default TextAreaHandle;