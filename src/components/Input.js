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

const Input = React.createClass({
    getSchemaElement(){
        return this.props.schemaElement;
    },
    handleChange(e){
        let schemaElement = this.getSchemaElement();
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:e.target.value});
    },
    handleBlur(e){
        let schemaElement = this.getSchemaElement();
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onBlur({ElementID:this.props.ElementID,Element:schemaElement,Value:e.target.value});
    },
    render() {
        let schemaElement = this.getSchemaElement();
        return(
            <FormControl type={this.props.type} value={this.props.value} onChange={this.handleChange} onBlur={this.handleBlur}/>
        );
    }
});

export default Input;