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
import { TinyMceHandle, TextAreaHandle, FileHandle, CheckBoxesHandle,RadioButtonsHandle, DatePickerHandle,SelectHandle, InputHandle, ImageHandle} from './handlers'
// Elements
import { CheckBoxes, RadioButtons, DatePicker, Static, File, Tinymce, Select, Textarea, Input, Submit, Image} from './components/'
import SchemaHelper from './SchemaHelper';

const Render = React.createClass({
    Form:null,
    checkBoxes(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let value = this.Form.getValueElement(ElementID);
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };

        // get props element or default props
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element} ref="parent-container">
                    <CheckBoxes parent={this.refs['parent-container']} value={value} valuesSchema={Element.values} handle={new CheckBoxesHandle(Element,this.Form.dispatcher)} ElementID={ElementID} schemaElement={Element}/>
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
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <RadioButtons value={value} values={Element.values} handle={new RadioButtonsHandle(Element,this.Form.dispatcher)} ElementID={ElementID} schemaElement={Element}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    datepicker(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };

        let value = this.Form.getValueElement(ElementID);
        let SelectedDate;
        // get props element or default props
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        // range years from element props
        let rangeYears = ElementProps["range-years"];
        if(typeof value =='string') {
            let DateObj = new window.Date();
            // todo edit date from string
            SelectedDate = {
                "month": DateObj.getMonth() + 1,
                "day": DateObj.getDate(),
                "year": DateObj.getFullYear(),
                "rangeYears":rangeYears,
                "showCalendar":false,
                "showBottom":true
            };
        }else{
            SelectedDate = value.date;
        }
        // this is real value component
        let ValueDate = value.value || "";
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <DatePicker showBottom={SelectedDate.showBottom} show={SelectedDate.showCalendar} value={ValueDate} SelectedDate={SelectedDate} handle={new DatePickerHandle(Element,this.Form.dispatcher)} ElementID={ElementID} schemaElement={Element} ElementProps={ElementProps}/>
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
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Textarea value={this.Form.getValueElement(ElementID)} handle={new TextAreaHandle(Element,this.Form.dispatcher)} ElementID={ElementID} schemaElement={Element}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    input(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };
        // get props from schema or default
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Input type={ElementProps.type} value={this.Form.getValueElement(ElementID)} handle={new InputHandle(Element,this.Form.dispatcher)} ElementID={ElementID} schemaElement={Element}/>
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
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {ElementProps.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Select values={Element.values} name={Element.props.name} handle={new SelectHandle(Element,this.Form.dispatcher)} ElementID={ElementID} schemaElement={Element}/>
                </Col>
                {error.length>0 ? <div dangerouslySetInnerHTML={createMarkup()} />: null}
            </FormGroup>
        );
    },
    submit(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        return <Submit name={ElementProps.name} className={ElementClasses.button} onSubmit={this.Form.Events.onSubmit}/>
    },
    tinymce(){
        let Element = this.props.Element;
        let ElementID = this.props.ElementID;
        let error = this.Form.getElement(ElementID).valid_error || "";
        function createMarkup() { return {__html: error}; };
        let schemaHelper = new SchemaHelper(this.Form,ElementID);
        let ElementProps = schemaHelper.getModifyProps();
        let ElementClasses = schemaHelper.getModifyClasses();
        return (
            <FormGroup controlId={ElementID}>
                <Col componentClass={ControlLabel} className={ElementClasses.label}>
                    {Element.props.name}
                </Col>
                <Col className={ElementClasses.element}>
                    <Tinymce value={this.Form.getValueElement(ElementID)} handle={new TinyMceHandle(Element,this.Form.dispatcher)} ElementID={ElementID} schemaElement={Element} ElementProps={ElementProps}/>
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