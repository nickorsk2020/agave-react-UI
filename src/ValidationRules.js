/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const ValidationRules = class{
    constructor(typeComponent,schemaElement){
        this.schemaElement = schemaElement;
        switch (typeComponent) {
            case 'input':
                this.AllowedRules = [
                    'notNull',
                    'min',
                    'max',
                    'isEmail',
                    'onlyLetters',
                    'onlyNumbers',
                    'isURL',
                    'leastOneDigit',
                    'leastOneLowerCase',
                    'leastOneUpperCase'
                ];
                break;
            case 'submit':
                this.AllowedRules = [];
                break;
            case 'image':
                this.AllowedRules = [
                    'fileNotEmpty',
                    'fileType',
                    'maxFileSize',
                    'minFileSize',
                ];
                break;
            case 'file':
                this.AllowedRules = [
                    'fileNotEmpty',
                    'fileType',
                    'maxFileSize',
                    'minFileSize',
                ];
                break;
            case 'textarea':
                this.AllowedRules = [
                    'notNull',
                    'min',
                    'max',
                ];
                break;
            case 'select':
                this.AllowedRules = [
                    'notNull'
                ];
                break;
            case 'tinymce':
                this.AllowedRules = [
                    'notNull',
                    'min',
                    'max',
                ];
                break;
            case 'static':
                this.AllowedRules = [];
                break;
            case 'datepicker':
                this.AllowedRules = [
                    'notNull',
                    'minDate',
                    'maxDate',
                    'minTime',
                    'mxnTime',
                ];
                break;
            case 'radioButtons':
                this.AllowedRules = [
                    'notNull',
                ];
                break;
            case 'checkBoxes':
                this.AllowedRules = [
                    'notNull',
                ];
                break;
            default:
                this.AllowedRules = [];
                break;
        }
    }
    // get schemaElement
    getSchemaElement(){
        return this.schemaElement;
    }
    // get validator data from schema
    getValidatorData(Rule){
        // max size byte
        let validators = this.getSchemaElement().validators;
        for(let v=0;v<validators.length;v++){
            if(validators[v].type==Rule){
                return validators[v];
            }
        }
        return null;
    }
    // validate rule
    validateRules(Rule){
        let AllowedRules = this.AllowedRules;
        return AllowedRules.includes(Rule);
    }
    datepicker_notNull(val){
        console.log(val);
        return val.length>0;
    }
    checkbox_notNull(val){
        if(Array.isArray(val)){
            if(val.length>0){
                return true;
            }
        }
        return false;
    }
    notNull(val){
        let schemaElement = this.getSchemaElement();
        if(schemaElement.type=='checkBoxes') return this.checkbox_notNull(val);
        if(schemaElement.type=='datepicker') return this.datepicker_notNull(val);

        if(val==null){ return false;}
        if(typeof val =="number"){
            if(val>0) {
                return true;
            }
        }else{
            if(val.length>0) {
                return true;
            }
        }
        return false;
    }
    fileNotEmpty(file){
        if(typeof file.fileInput!='undefined'){
            if(Object.prototype.toString.call(file.fileInput) === '[object File]'){
                return true;
            }
        }
        return false;
    }
    minFileSize(file){
        let filesize = file.fileInput.size;
        // min size kilobyte
        let size = this.getValidatorData('minFileSize').value;
        return (filesize/1000)>size;
    }
    maxFileSize(file){
        let filesize = file.fileInput.size;
        // max size kilobyte
        let size = this.getValidatorData('maxFileSize').value;
        return (filesize/1000)<size;
    }
    fileType(file,types) {
        let Types = types.split(',');
        let file_type = file.fileInput || null;
        if(file_type!=null){
            file_type = file_type.type || null;
        }
        if(file_type==null){
            return false;
        }
        for(let t=0;t<Types.length;t++){
            let mime = '';
            switch (Types[t]) {
                // image types
                case 'jpg':
                case 'jpeg':
                    mime = 'image/jpeg';
                    break;
                case 'pjpeg':
                case 'jfif':
                    mime = 'image/pjpeg';
                    break;
                case 'png':
                case 'tiff':
                case  'gif':
                case 'webp':
                    mime = 'image/'+Types[t];
                    break;
                // audio types
                case 'mpeg':
                case 'mp3':
                    mime = 'audio/mpeg';
                    break;
                case 'wav':
                    mime = 'audio/wave';
                    break;
                // pdf types
                case "pdf":
                    mime="application/pdf";
                    break;
                // MS word types
                case "dot":
                case "doc":
                    mime = "application/msword";
                    break;
                case "docx":
                    mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    break;
                case "dotx":
                    mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.template";
                    break;
                case "docm":
                    mime = "application/vnd.ms-word.document.macroEnabled.12";
                    break;
                case "dotm":
                    mime = "application/vnd.ms-word.template.macroEnabled.12";
                    break;
                // MS exel types
                case "xlt":
                case "xla":
                case "xls":
                    mime = "application/vnd.ms-excel";
                    break;

                case "xlsx":
                    mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    break;
                case "xltx":
                    mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.template";
                    break;
                case "xlsm":
                    mime = "application/vnd.ms-excel.sheet.macroEnabled.12";
                    break;
                case "xltm":
                    mime = "application/vnd.ms-excel.template.macroEnabled.12";
                    break;
                case "xlam":
                    mime = "application/vnd.ms-excel.addin.macroEnabled.12";
                    break;
                case "xlsb":
                    mime = "application/vnd.ms-excel.sheet.binary.macroEnabled.12";
                    break;
                // MS powerpoint types
                case "ppt":
                case "pot":
                case "pps":
                case "ppa":
                    mime = "application/vnd.ms-powerpoint";
                    break;

                default:
                    console.error("type file not valid!");
            }
            if(file_type==mime){
                return true;
            }
        }
        return false;
    }
    min(val,min){
        if(val.length>=min){
            return true;
        }else{
            return false;
        }
    }
    max(val,max){
        console.log(val.length<max);
        if(val.length<=max){
            return true;
        }else{
            return false;
        }
    }
    isEmail(value){
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value);
    }
    onlyLetters(val){
        if(val.match(/^[A-Za-z]+$/)){
            return true;
        }else{
            return false;
        }
    }
    onlyNumbers(val){
        if(!/\D/.test(val)){
            return true;
        }else{
            return false;
        }
    }
    isURL(val){
        var myRegExp = /^((http|ftp|https)?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}|(?!(http|ftp|https))[^\s]+\.[^\s]{2,})?$/gi;
        if (myRegExp.test(val)){
            if(/^[\w\/]?$/.test(val.slice(-1))){
                return true;
            }
        }
        return false;
    }
    leastOneDigit(val){
        if (!/\d/.test(val)){
            return false;
        }else{
            return true;
        }
    }
    leastOneLowerCase(val){
        if (!/[a-z]/.test(val)){
            return false;
        }else{
            return true;
        }
    }
    leastOneUpperCase(val){
        if (!/[A-Z]/.test(val)){
            return false;
        }else{
            return true;
        }
    }
};

export default ValidationRules;