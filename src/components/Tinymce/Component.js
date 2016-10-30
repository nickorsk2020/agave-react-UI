/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import {eventFire} from '../../Helper';
import Component from '../classes/Component'
import PrivateSettings from './PrivateSettings'

class Tinymce extends Component
{
    binding(){
        this.handleChange = this.handleChange.bind(this);
    }
    constructor(props){
        super(props);
        this.binding();
    }
    componentWillMount(){
        this.initSettingsElement(PrivateSettings);
    }
    componentDidMount(){
        let tinymce = window.tinymce;
        let _this = this;
        let props =this.getPropsElementFromSchema();
        tinymce.remove();
        tinymce.init({
            selector:'#tinymce_el',
            height: props.height,
            plugins:props.plugins,
            toolbar1:props.toolbar1,
            toolbar2:props.toolbar2,
            language_url:props.language_url,
            setup: function (editor) {
                editor.on('Change', function () {
                    _this.handleChange( editor.getContent());
                });
                editor.on('focus', function() {
                    eventFire(window, 'click');
                });
            }
        });
    }
    handleChange(Html){
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Value:Html});
    }
    render() {
        let value = this.getValueElement();
        return(
            <textarea id="tinymce_el" value={value}>{value}</textarea>
        );
    }
}

export default Tinymce;
