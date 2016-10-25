/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const ValidatorSchema = class
{
    constructor(Form){
        this.Form = Form;
    }
    validateSchema(){
        return this.validateElements();
    }
    // validation elements in schema
    validateElements(){
        let schema = this.Form.getSchema();
        let Elements = schema.elements || null;
        if(Elements==null){
            console.error('Schema not have elements');
            return false;
        }
        if(typeof Elements !='object'){
            console.error('Elements of schema is not object');
            return false;
        }
        let valid = true;
        for(let ElementID in Elements){
            let typeElement = Elements[ElementID].type || null;
            if(typeElement==null){
                console.error('Element "'+ElementID+'" not have type');
                return false;
            }
            switch (typeElement) {
                case 'input':
                    valid =  this.validate_input(ElementID,Elements[ElementID]);
                    break;
                case 'submit':
                    valid =  this.validate_submit(ElementID,Elements[ElementID]);
                    break;
                case 'image':
                    valid =  this.validate_image(ElementID,Elements[ElementID]);
                    break;
                case 'file':
                    valid =  this.validate_file(ElementID,Elements[ElementID]);
                    break;
                case 'textarea':
                    valid =  this.validate_textarea(ElementID,Elements[ElementID]);
                    break;
                case 'select':
                    valid =  this.validate_select(ElementID,Elements[ElementID]);
                    break;
                case 'tinymce':
                    valid =  this.validate_tinymce(ElementID,Elements[ElementID]);
                    break;
                case 'static':
                    valid =  this.validate__static(ElementID,Elements[ElementID]);
                    break;
                case 'datepicker':
                    valid =  this.validate_datepicker(ElementID,Elements[ElementID]);
                    break;
                case 'radioButtons':
                    valid =  this.validate_radioButtons(ElementID,Elements[ElementID]);
                    break;
                case 'checkBoxes':
                    valid =  this.validate_checkBoxes(ElementID,Elements[ElementID]);
                    break;
                default:
                    break;
            }
        }
        return valid;
    }
    validate_input(ElementID,Element){
        let valid = true;

        return valid;
    }
    validate_submit(ElementID,Element){
        let valid = true;

        return valid;
    }
    validate_image(ElementID,Element){
        let valid = true;

        return valid;
    }
    validate_file(ElementID,Element){
        let valid = true;

        return valid;
    }
    validate_textarea(ElementID,Element){
        let valid = true;
        return valid;
    }
    validate_select(ElementID,Element){
        let valid = true;
        return valid;
    }
    validate_tinymce(ElementID,Element){
        let valid = true;
        return valid;
    }
    validate__static(ElementID,Element){
        let valid = true;
        return valid;
    }
    validate_datepicker(ElementID,Element){
        let valid = true;
        return valid;
    }
    validate_radioButtons(ElementID,Element){
        let valid = true;
        return valid;
    }
    validate_checkBoxes(ElementID,Element){
        let valid = true;
        return valid;
    }
};

export default ValidatorSchema;