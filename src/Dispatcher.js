/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const Dispatcher = class{
    Form = null;
    constructor(Form = null){
        this.Form = Form;
    }
    // отпарвляет тип события,ID элемента сгенерирующего событие, Элемент и его значение
    SendMessage(Type,Message){
        this.Form.dispatcher_events[Type](Message);
    }
};

export default Dispatcher;