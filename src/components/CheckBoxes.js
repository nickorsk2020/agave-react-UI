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

const CheckBoxes = React.createClass({
    getSchemaElement(){
        return this.props.schemaElement;
    },
    // send value to dispatcher
    sendValue(Value){
        let schemaElement = this.getSchemaElement();
        let parent = ReactDOM.findDOMNode(this.props.parent);
        let value = [];
        if(parent==null){
            value.push(Value);
        }else{
            // value is checked earlier
            let valueIsCheked = false;
            let checkboxes = parent.getElementsByClassName('checkbox-element');
            // loop all checkboxes
            for(let c=0;c<checkboxes.length;c++){
                if(checkboxes[c].checked){
                    if(Value!=checkboxes[c].value){
                        value.push(checkboxes[c].value);
                    }else{
                        valueIsCheked = true;
                        value.splice(c,1);
                    }
                }
            }
            if(!valueIsCheked){
                value.push(Value);
            }
        }
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:value});
    },
    clickParentDiv(event){
        event.stopPropagation();
        let el = event.target;
        let radio = el.getElementsByClassName('checkbox-element')[0];
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
            .checkbox-element-parent{
                cursor:pointer;
                display:inline-block;
            }
        `;
        let checkedValues = this.props.value;
        let valuesSchema = this.props.valuesSchema;
        let _this = this;
        return(
            <div value={this.props.value}>
                <style>
                    {style}
                </style>
                {valuesSchema.map(function (Value) {
                    let checked = false;
                    for(let c=0;c<checkedValues.length;c++){
                        if(Value.value==checkedValues[c]){
                            checked =true;
                        }
                    }
                    return  <div key={Value.value} ><div onClick={_this.clickParentDiv} className="checkbox-element-parent"><input className="checkbox-element" checked={checked} type="checkbox" name={_this.props.ElementID} value={Value.value} onChange={_this.changeRadio}/> &nbsp;{Value.text}</div><br/></div>
                })}
            </div>
        );
    }
});

export default CheckBoxes;