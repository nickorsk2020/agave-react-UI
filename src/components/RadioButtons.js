/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';

const RadioButtons = React.createClass({
    getSchemaElement(){
        return this.props.schemaElement;
    },
    // send value to dispatcher
    sendValue(value){
        let schemaElement = this.getSchemaElement();
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:parseInt(value)});
    },
    clickParentDiv(event){
        event.stopPropagation();
        let el = event.target;
        let radio = el.getElementsByClassName('radio-element')[0];
        if(radio!=null){
            this.sendValue(radio.value);
        }
    },
    changeRadio(event){
        let radio = event.target;
        this.sendValue(radio.value);
    },
    render() {
        let style =  `
            .radio-element-parent{
                cursor:pointer;
                display:inline-block;
            }
        `;
        let Values = this.props.values;
        let _this = this;
        return(
            <div value={this.props.value}>
                <style>
                    {style}
                </style>
                {Values.map(function (Value) {
                    return  <div key={Value.value}><div onClick={_this.clickParentDiv} className="radio-element-parent"><input className="radio-element" checked={(()=>Value.value==_this.props.value)()} type="radio" name={_this.props.ElementID} value={Value.value} onChange={_this.changeRadio}/> &nbsp;{Value.text}</div><br/></div>
                })}
            </div>
        );
    }
});

export default RadioButtons;