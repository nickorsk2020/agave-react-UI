/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import { FormGroup,Button,ControlLabel, Col } from 'react-bootstrap';
import Component from '../classes/Component'
import PrivateSettings from './PrivateSettings'

class File extends Component
{
    binding(){
        this.openFileHandle = this.openFileHandle.bind(this);
        this.changeFileHandle = this.changeFileHandle.bind(this);
    }
    constructor(props){
        super(props);
        this.binding();
    }
    componentWillMount(){
        this.initSettingsElement(PrivateSettings);
    }
    openFileHandle(){
        let fileInput = this.refs.fileInput;
        fileInput.click();
    }
    changeFileHandle(){
        let fileInput = this.refs.fileInput;
        let settings = this.getSettings();
        settings.Reader.readAsDataURL(fileInput.files[0]);
    }
    componentDidMount(){
        let _this = this;
        let settings = this.getSettings();
        settings.Reader.onloadend = function(e) {
            var dataUri = e.target.result;
            let fileInput = _this.refs.fileInput;
            // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
            _this.props.handle.onChange({ElementID:_this.props.ElementID,Value:{dataUri:dataUri,fileInput:fileInput.files[0]}});
        };
    }
    render() {
        let Element = this.getSchemaElement();
        let fileName = false;
        let value = this.getValueElement();
        if(typeof value =='object'){
            fileName =value.fileInput.name;
        }else{
            fileName = false;
        }
        return(
            <FormGroup>
                <Col componentClass={ControlLabel} className={Element.classes.label}>
                    {Element.props.name}
                </Col><br/>
                <input type="file" style={{display:"none"}} ref="fileInput" onChange={this.changeFileHandle}/>
                <div className="file_upload_cont">
                    <Button className="btn btn-primary" onClick={this.openFileHandle}>Выбрать фото</Button>
                    {fileName || Element.props.description || ""}
                </div>
            </FormGroup>
        );
    }
}

export default File;