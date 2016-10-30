/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import ValidationRules from './ValidationRules'
import Render from './Render'
import Events from './Events'
import Dispatcher from './Dispatcher'
import ValidatorSchema from './schema/ValidatorSchema'
import SchemaStore from './schema/SchemaStore'

const Form = React.createClass({
    idForm:null,
    // dispatcher message from input to form
    dispatcher:null,
    dispatcher_events:null,
    // show error validation form
    showError:false,
    getInitialState(){
        this.FormID = this.getSchema().FormID;
        // init model
        let state = this.initModel();
        return state;
    },
    // init model
    initModel(){
        let ElementsSchema = this.getElements_FromSchema();
        let model = {
            form:{valid:false},
            elements:{}
        };
        for(let key in ElementsSchema){
            model.elements[key] = {
                value:ElementsSchema[key].value,
                valid:this.validateElement(key,true).valid
            }
        }
        return model;
    },
    componentDidUpdate(){

    },
    componentWillMount(){
        /** Сюда приходят события из инпутов в форму */
        this.dispatcher = new Dispatcher(this);
        this.dispatcher_events = {
            //=============Input================================
            // устанавливает значение и валидирует элемент
            input_blur:function(Message){
                this.setModelState(Message,true);
            }.bind(this),

            // устанавливает значение элемента
            input_change:function(Message){
                this.showError = false;
                this.setModelState(Message);
            }.bind(this),
            //=============Input[END]==========================
            //=============TextArea================================
            // устанавливает значение и валидирует элемент
            textarea_blur:function(Message){
                this.setModelState(Message,true);
            }.bind(this),

            // устанавливает значение элемента
            textarea_change:function(Message){
                this.showError = false;
                this.setModelState(Message);
            }.bind(this),
            //=============TextArea[END]==========================
            //=============Image===============================
            image_change:function (Message) {
                this.showError = false;
                this.setModelState(Message,true);
            }.bind(this),
            //=============Image[END]==========================
            //=============File===============================
            file_change:function (Message) {
                this.showError = false;
                this.setModelState(Message,true);
            }.bind(this),
            //=============File[END]==========================
            //=============Select==============================
            select_change:function(Message){
                this.showError = false;
                this.setModelState(Message);
            }.bind(this),
            //=============Select[END]==========================
            validate_form:function(){
                this.validateForm();
            }.bind(this),
            //=============DatePicker===========================
            // устанавливает значение элемента
            datePicker_change:function(Message){
                this.showError = false;
                this.setModelState(Message);
            }.bind(this),
            datePicker_change_settings:function(Message) {
                this.setModelState(Message);
            }.bind(this),
            //=============DatePicker[END]======================
            //=============RadioButtons=========================
            radioButtons_change:function(Message) {
                this.showError = false;
                this.setModelState(Message);
            }.bind(this),
            //=============RadioButtons[END]====================
            //=============CheckBoxes===========================
            checkBoxes_change:function(Message) {
                this.showError = false;
                this.setModelState(Message);
            }.bind(this),
            //=============CheckBoxes[END]======================
            //=============Input================================
            // устанавливает значение и валидирует элемент
            tinyMceHandle_blur:function(Message){
                this.setModelState(Message,true);
            }.bind(this),

            // устанавливает значение элемента
            tinyMceHandle_change:function(Message){
                this.showError = false;
                this.setModelState(Message);
            }.bind(this),
            //=============Input[END]==========================
        };
        /** Events form **/
        this.Events = Events;
        this.Events.onSubmit = this.props.onSubmit.bind(null,{Form:this,Model:this.state});
        /** Init Schema**/
        SchemaStore.setSchema(this.getSchema());
    },
    // получаем состояние модели
    getModelState(){
        return this.state;
    },
    // меняем состояние модели,
    // isValidElement = значит установить валидность в состоянии при этом могут быть сообщения об ошибке валидации
    setModelState({ ElementID, Value},doValidateElement = false){
        let state = Object.assign({},this.state);
        let elements = state.elements;
        // сюди приходит элемент который изменился и его значение
        // находим элемент и меняем его значение и валидность
        for(var e in elements){
            if(e == ElementID){
                elements[e].value = Value;
                if(doValidateElement){
                    let validation = this.validateElement(ElementID);
                    elements[e].valid = validation.valid;
                    elements[e].valid_error = validation.error;
                }else{
                    elements[e].valid_error = "";
                }
            }
        }
        this.setState(state);
        return state;
    },
    // валидация формы
    validateForm(){
        let state = this.getModelState();
        let elements = state.elements;
        let validForm = true;
        for(let e in elements){
            let validation = this.validateElement(e);
            elements[e].valid = validation.valid;
            elements[e].valid_error = validation.error;
            if(!elements[e].valid && validForm){
                validForm = false;
            }
        }
        state.form.valid = validForm;
        if(!state.form.valid){
            this.showError = true;
        }
        this.setState(state);
        return state;
    },
    // форма валидна? Не валидирует, только возвращает текущее состояние
    formIsValid(){
        let state = this.getModelState();
        return state.form.valid;
    },
    // валидация элемента
    validateElement(ElementID = null, isInitState = false){
        // получаем елемент по имени из атрибута функции
        if(ElementID == null){
            return false;
        }
        let Element = null;
        let schemaElement =  this.getElementSchema(ElementID);
        // for first init component get data from schema, not from model
        if(isInitState){
            Element = schemaElement;
        }else{
            Element = this.getElement(ElementID)
        }
        // get validators list of component from schema
        let validators = this.getValidators(schemaElement);
        // validate
        let isValid = true;
        let error = "";
        for(let v=0;v<validators.length;v++){
            // if custom validator type
            if(validators[v].type=="custom" && !isInitState){
                // вызываем функцию из схемы с передачей значения инпута и состояния модели
                isValid = validators[v].validator({Form:this,Value:Element.value,Model:this.getModelState()});
                if(!isValid){
                    error = validators[v].error;
                    break;
                }
                continue;
            }

            // if common validator type
            let Rules = new ValidationRules(schemaElement.type,schemaElement);
            if(Rules.validateRules(validators[v].type)){
                let validatorProp = null;
                if(validators[v].type=="fileType"){
                    validatorProp = validators[v].values || null;
                }
                if(Rules[validators[v].type](Element.value,validatorProp)){
                    isValid = true;
                }else{
                    error = validators[v].error;
                    isValid =false;
                    break;
                }
            }else{
                console.error('Component "'+ElementID+'" not allow validate with rule '+validators[v].type);
            }
        }
        if(error.length){
        //    console.log("Валидация:"+error);
        }
        return {valid:isValid,error:error};
    },
    // получаем валидаторы елемента
    getValidators(Element){
        return Element.validators || [];
    },
    // получить значение элемента по его ID в модели
    getValueElement(ElementID){
        let state = this.getModelState();
        let elements = state.elements;
        for(var e in elements){
            if(e == ElementID){
               return elements[e].value
            }
        }
    },
    // получает элемент с модели
    getElement(ElementID){
        let state = this.getModelState();
        let elements = state.elements;
        for(var e in elements){
            if(e == ElementID){
                return elements[e]
            }
        }
    },
    // получить элемент из схемы
    getElementSchema(ElementID = null){
        if(ElementID == null){
            return false;
        }
        let Elements = this.getElements_FromSchema();
        for(let key in Elements){
            if(key == ElementID){
                return Elements[key];
            }
        }
        return null;
    },
    // получить элементы из схемы
    getElements_FromSchema(){
        let schema = this.getSchema();
        return schema.elements;
    },
    // получаем схему
    getSchema(){
        return this.props.schema;
    },
    render() {
        let scheme = this.getSchema();
        let Elements = this.getElements_FromSchema();
        let errorFormValid = scheme.errorForm || null;
        let _this = this;
        // validation schema
        let validatorSchema = new ValidatorSchema(this);
        if(!validatorSchema.validateSchema()) return (<div>Schema not valid</div>);

        return(
            <div>
                <div className={scheme.classes.errorForm}>{(function () {if(_this.showError && errorFormValid!=null) return errorFormValid})()}</div>
                { Object.keys(Elements).map(function(ElementID) {
                        return <Render key={ElementID} Form={_this} Element={Elements[ElementID]} ElementID={ElementID}/>
                    })
                }
            </div>
        );
    }
});

export default Form;