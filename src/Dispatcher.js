/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const Dispatcher = class{
    constructor(Form = null){
        this.Form = Form;
    }
    // send type event and data message
    SendMessage(Type,Message){
        this.Form.dispatcher_events[Type](Message);
    }
};

export default Dispatcher;