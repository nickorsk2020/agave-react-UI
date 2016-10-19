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

const Submit = React.createClass({
    getSchemaElement(){
        return this.props.schemaElement;
    },
    handleChange(e){
        let schemaElement = this.getSchemaElement();
        console.log(e.target.value);
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:e.target.value});
    },
    render() {
        let Values = this.props.values;
        let _this = this;
        return(
            <FormControl componentClass="select" value={this.props.value} onChange={_this.handleChange}>
                {Values.map(function (Value) {
                  return  <option key={Value.value} value={Value.value}>{Value.text}</option>
                })}
            </FormControl>
        );
    }
});
export default Submit;