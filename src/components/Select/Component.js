/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import  { FormControl } from 'react-bootstrap';
import Component from '../classes/Component'
import PrivateSettings from './PrivateSettings'

class Select extends Component
{
    binding(){
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        this.initSettingsElement(PrivateSettings);
    }
    constructor(props){
        super(props);
        this.binding();
    }
    handleChange(e){
        let schemaElement = this.getSchemaElement();
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:e.target.value});
    }
    render() {
        let propsSchema = this.getPropsElementFromSchema();
        let Schema = this.getSchemaElement();
        let value = this.getValueElement();
        let _this = this;
        return(
            <FormControl componentClass="select" value={value} onChange={_this.handleChange}>
                <option disabled="disabled" value="">{propsSchema.placeholder}</option>
                {Schema.values.map(function (Value) {
                  return  <option key={Value.value} value={Value.value}>{Value.text}</option>
                })}
            </FormControl>
        );
    }
}
export default Select;