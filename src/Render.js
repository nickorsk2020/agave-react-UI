/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import { FormGroup,ControlLabel, Col } from 'react-bootstrap';
import { TinyMceHandle, TextAreaHandle, FileHandle, CheckBoxesHandle,RadioButtonsHandle, DatePickerHandle,SelectHandle, InputHandle, ImageHandle} from './handlers_components'
// Elements
import { CheckBoxes, RadioButtons, DatePicker, Static, File, Tinymce, Select, Textarea, Input, Submit, Image} from './components/'
import SchemaStore from './schema/SchemaStore'
import SchemaHelper from './schema/SchemaHelper'

const Render = React.createClass({
    Form:null,
    checkBoxes(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let value = this.Form.getValueElement(ElementID);
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };
        // get props element or default props
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element} ref="parent-container">
                    <CheckBoxes FormID={this.Form.FormID} ElementID={ElementID} handle={new CheckBoxesHandle(Element,this.Form.dispatcher)} value={value} parent={this.refs['parent-container']} />
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    radioButtons(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let value = this.Form.getValueElement(ElementID);
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };

        // get props element or default props
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <RadioButtons FormID={this.Form.FormID} ElementID={ElementID} handle={new RadioButtonsHandle(Element,this.Form.dispatcher)} value={value}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    datepicker(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; }
        let value = this.Form.getValueElement(ElementID);
        // get props element or default props
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <DatePicker FormID={this.Form.FormID} ElementID={ElementID} handle={new DatePickerHandle(Element,this.Form.dispatcher)} value={value}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    _static(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        return <Static html={Element.props.html} schemaElement={Element}/>
    },
    file(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let fileName = "";
        let file = this.Form.getElement(ElementID);
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };
        if(typeof file.value =="object"){
            fileName = file.value.fileInput.name;
        }
        return(
            <div>
                <File fileName={fileName} handle={new FileHandle(Element,this.Form.dispatcher)} Element={this.props.Element} ElementID={ElementID} schemaElement={Element}/>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </div>
        );
    },
    image(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let file = this.Form.getElement(ElementID);
        let Src = "";
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };

        if(file.value.dataUri != 'undefined'){
            Src = file.value.dataUri;
        }
        return (
            <div>
                <Image src={Src} handle={new ImageHandle(Element,this.Form.dispatcher)} Element={this.props.Element} ElementID={ElementID} schemaElement={Element}/>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </div>
        );
    },
    textarea(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };
        // get props from schema or default
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Textarea FormID={this.Form.FormID} ElementID={ElementID} handle={new TextAreaHandle(Element,this.Form.dispatcher)} value={this.Form.getValueElement(ElementID)} />
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    input(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error} };
        // get props element or default props
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Input FormID={this.Form.FormID} ElementID={ElementID} handle={new InputHandle(Element,this.Form.dispatcher)} value={this.Form.getValueElement(ElementID)}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    select(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };
        // get props element or default props
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Select FormID={this.Form.FormID} ElementID={ElementID} handle={new SelectHandle(Element,this.Form.dispatcher)} value={this.Form.getValueElement(ElementID)}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    submit(){
        let ElementID = this.props.ElementID;
        // get props element or default props
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return <Submit name={ElementProps.name} className={ElementClasses.button} onSubmit={this.Form.Events.onSubmit}/>
    },
    tinymce(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };
        // get props element or default props
        let SchemaElement = SchemaStore.getSchemaElement({ FormID:this.Form.FormID, ElementID:ElementID});
        let ElementProps = SchemaElement.props;
        let ElementClasses = SchemaElement.classes;
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Tinymce FormID={this.Form.FormID} ElementID={ElementID} handle={new TinyMceHandle(Element,this.Form.dispatcher)} value={this.Form.getValueElement(ElementID)}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    getTemplate(Type){
        switch (Type) {
            case 'input':
                return this.input();
            case 'submit':
                return this.submit();
            case 'image':
                return this.image();
            case 'file':
                return this.file();
            case 'textarea':
                return this.textarea();
            case 'select':
                return this.select();
            case 'tinymce':
                return this.tinymce();
            case 'static':
                return this._static();
            case 'datepicker':
                return this.datepicker();
            case 'radioButtons':
                return this.radioButtons();
            case 'checkBoxes':
                return this.checkBoxes();
            default:
                console.error("Element type not found!!!");
                return <div>Element type not found!!!</div>
        }
    },
    render() {
        this.Form = this.props.Form;
        let Element = this.props.Element;
        return(
            this.getTemplate(Element.type)
        );
    }
});

export default Render;