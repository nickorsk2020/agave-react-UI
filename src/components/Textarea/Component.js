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

class Textarea extends Component
{
    binding(){
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    constructor(props){
        super(props);
        this.binding();
    }
    componentWillMount(){
        this.initSettingsElement(PrivateSettings);
    }
    handleChange(e){
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Value:e.target.value});
    }
    handleBlur(e){
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onBlur({ElementID:this.props.ElementID,Value:e.target.value});
    }
    render() {
        let style = {
            "width": "100%",
            "resize":"none",
            "height":"150px"
        };

        return(
            <textarea style={style} value={this.props.value} onChange={this.handleChange} onBlur={this.handleBlur}>{this.props.value}</textarea>
        );
    }
}

export default Textarea;