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

const Image = React.createClass({
    getSchemaElement(){
        return this.props.schemaElement;
    },
    Reader:new FileReader(),
    componentDidMount(){
        let _this = this;
        this.Reader.onloadend = function(e) {
            var dataUri = e.target.result;
            let fileInput = _this.refs.fileInput;
            let schemaElement = _this.getSchemaElement();
            // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
            _this.props.handle.onChange({ElementID:_this.props.ElementID,Element:schemaElement,Value:{dataUri:dataUri,fileInput:fileInput.files[0]}});
        };
    },
    changeImageHandle(){
        let fileInput = this.refs.fileInput;
        // подгрузим иконку
        this.Reader.readAsDataURL(fileInput.files[0]);
    },
    openFileHandle(){
        let fileInput = this.refs.fileInput;
        fileInput.click();
    },
    render() {
        let photo_file_container =  {
            "display":"inline-block",
            "position":"relative",
            "width": "200px",
            "height": "160px",
            "overflow": "hidden",
            "verticalAlign": "middle",
            "textAlign": "center",
            "lineHeight": "160px",
            "background": "#dedede",
            "marginRight": "10px"
        };
        let photo_file_img = {
            "maxWidth": "100%",
            "maxHeight": "100%",
            "display": "inline-block",
            "marginBottom": "2px"
        };

        let file_upload_cont = {
            display: "inline-block",
            verticalAlign: "middle"
        };
        let Element = this.props.Element;
        return(
            <FormGroup>
                <Col componentClass={ControlLabel} className={Element.classes.label}>
                    {Element.props.name}
                </Col><br/>
                <input type="file" style={{display:"none"}} ref="fileInput" onChange={this.changeImageHandle}/>
                <div className="photo_file_container" style={photo_file_container}>
                    <img className="photo_file_img" style={photo_file_img} src={this.props.src}/>
                </div>
                <div className="file_upload_cont" style={file_upload_cont}>
                    <Button className="btn btn-primary" onClick={this.openFileHandle}>Выбрать фото</Button>
                    <br/>{Element.props.description || ""}
                </div>
            </FormGroup>
        );
    }
});

export default Image;