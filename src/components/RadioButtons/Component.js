/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import Component from '../classes/Component'
import PrivateSettings from './PrivateSettings'

class RadioButtons extends Component
{
    binding(){
        this.sendValue = this.sendValue.bind(this);
        this.clickParentDiv = this.clickParentDiv.bind(this);
        this.changeRadio = this.changeRadio.bind(this);
    }
    constructor(props){
        super(props);
        this.binding();
    }
    componentWillMount(){
        this.initSettingsElement(PrivateSettings);
    }
    // send value to dispatcher
    sendValue(value){
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Value:parseInt(value)});
    }
    clickParentDiv(event){
        event.stopPropagation();
        let el = event.target;
        let radio = el.getElementsByClassName('radio-element')[0];
        if(radio!=null){
            this.sendValue(radio.value);
        }
    }
    changeRadio(event){
        let radio = event.target;
        this.sendValue(radio.value);
    }
    render() {
        let style =  `
            .radio-element-parent{
                cursor:pointer;
                display:inline-block;
            }
        `;
        let Values = this.getSchemaElement().values;
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
}

export default RadioButtons;