/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import ReactDOM from 'react-dom'
import Component from '../classes/Component'
import PrivateSettings from './PrivateSettings'
import { deepClone } from '../../Helper'

class CheckBoxes extends Component
{
    binding(){
        this.sendValue = this.sendValue.bind(this);
        this.clickParentDiv = this.clickParentDiv.bind(this);
        this.changeRadio = this.changeRadio.bind(this);
        this.setValueFromSchema = this.setValueFromSchema.bind(this);
    }
    constructor(props){
        super(props);
        this.binding();
    }
    // set value from schema
    setValueFromSchema(){
        let value = this.getValueElement();
        if(value.length>0){
            let settings = deepClone(this.getSettings());
            let array_values = value.split(';');
            settings.array_values = array_values;
            this.setSettings(settings);
        }
    }
    componentWillMount(){
        this.initSettingsElement(PrivateSettings);
        this.setValueFromSchema();
    }
    // send value to dispatcher
    sendValue(Value){
        let schemaElement = this.getSchemaElement();
        let parent = ReactDOM.findDOMNode(this.props.parent);
        let array_values = [];
        if(parent==null){
            array_values.push(Value);
        }else{
            // value is checked earlier
            let valueIsCheked = false;
            let checkboxes = parent.getElementsByClassName('checkbox-element');
            // loop all checkboxes
            for(let c=0;c<checkboxes.length;c++){
                if(checkboxes[c].checked){
                    if(Value!=checkboxes[c].value){
                        array_values.push(checkboxes[c].value);
                    }else{
                        valueIsCheked = true;
                        array_values.splice(c,1);
                    }
                }
            }
            if(!valueIsCheked){
                array_values.push(Value);
            }
        }
        let settings = deepClone(this.getSettings());
        settings.array_values = array_values;
        this.setSettings(settings);
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:array_values.join(';')});
    }
    clickParentDiv(event){
        event.stopPropagation();
        let el = event.target;
        let radio = el.getElementsByClassName('checkbox-element')[0];
        if(radio!=null){
            this.sendValue(radio.value);
        }
    }
    clickRadio(event){
        event.stopPropagation();
    }
    changeRadio(event){
        event.stopPropagation();
        let radio = event.target;
        this.sendValue(radio.value);
    }
    render() {
        let style =  `
            .checkbox-element-parent{
                cursor:pointer;
                display:inline-block;
            }
        `;
        let valuesSchema = this.getSchemaElement().values;
        let _this = this;
        let settings = this.getSettings();
        let array_values = settings.array_values;
        return(
            <div value={this.props.value}>
                <style>
                    {style}
                </style>
                {valuesSchema.map(function (Value) {
                    let checked = false;
                    for(let a=0;a<array_values.length;a++){
                        if(Value.value==array_values[a]){
                            checked =true;
                        }
                    }
                    return  <div key={Value.value} ><div onClick={_this.clickParentDiv} className="checkbox-element-parent"><input className="checkbox-element" checked={checked} type="checkbox" name={_this.props.ElementID} value={Value.value} onChange={_this.changeRadio} onClick={_this.clickRadio}/> &nbsp;{Value.text}</div><br/></div>
                })}
            </div>
        );
    }
}

export default CheckBoxes;