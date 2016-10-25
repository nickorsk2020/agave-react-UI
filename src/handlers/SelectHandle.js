/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const SelectHandle = class{
    constructor(Element,Dispatcher){
        this.Element = Element;
        this.Dispatcher = Dispatcher;
    }
    onChange(Message){
        console.log(Message);
        this.Dispatcher.SendMessage('select_change',Message);
    }
};

export default SelectHandle;