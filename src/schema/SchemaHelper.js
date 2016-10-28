/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

const SchemaHelper = class{
    constructor(Form,ElementID){
        this.Form = Form;
        this.ElementID = ElementID;
        this.SchemaElement = Form.getElementSchema(ElementID);
    }
    getSchemaClasses(){
        return this.SchemaElement.classes || {};
    }
    getSchemaProps(){
        return this.SchemaElement.props || {};
    }
    getTypeElement(){
        return this.SchemaElement.type;
    }
    // get or modify classes
    getModifyClasses(){
        let classes = this.getSchemaClasses();
        switch (this.getTypeElement()) {
            case 'input':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'submit':
                if(typeof classes.button=='undefined'){
                    classes.button = '';
                }
                break;
            case 'image':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'file':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'textarea':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'select':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'tinymce':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'static':
                if(typeof classes.container=='undefined'){
                    classes.container = '';
                }
                break;
            case 'datepicker':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'radioButtons':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            case 'checkBoxes':
                if(typeof classes.label=='undefined'){
                    classes.label = '';
                }
                if(typeof classes.element=='undefined'){
                    classes.element = '';
                }
                break;
            default:
                break;
        }
        return classes;
    }
    // get or modify props
    getModifyProps(){
        let props = this.getSchemaProps();
        switch (this.getTypeElement()) {
            case 'input':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                if(typeof props.type=='undefined'){
                    props.type = 'text';
                }
                break;
            case 'submit':
                if(typeof props.name=='undefined'){
                    props.name = 'ok';
                }
                break;
            case 'image':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                if(typeof props.type=='undefined'){
                    props.description = '';
                }
                break;
            case 'file':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                if(typeof props.type=='undefined'){
                    props.description = '';
                }
                break;
            case 'textarea':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                break;
            case 'select':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                break;
            case 'tinymce':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                if(typeof props.language_url=='undefined'){
                    props.language_url = '';
                }
                if(typeof props.height=='undefined'){
                    props.height = 150;
                }
                if(typeof props.toolbar1=='undefined'){
                    props.toolbar1 = 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image';
                }
                if(typeof props.toolbar2=='undefined'){
                    props.toolbar2 = 'print preview media | forecolor backcolor emoticons';
                }
                if(typeof props.plugins=='undefined'){
                    props.plugins = [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons template paste textcolor colorpicker textpattern imagetools'
                    ];
                }
                break;
            case 'static':
                if(typeof props.html=='undefined'){
                    props.html = '';
                }
                break;
            case 'datepicker':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                if(typeof props.placeholder=='undefined'){
                    props.placeholder = '';
                }
                if(typeof props['range-years']=='undefined'){
                    let currentYear = new Date().getFullYear();
                    props['range-years'] = currentYear+'-'+currentYear+10;
                }
                if(typeof props['placeholder-hour']=='undefined'){
                    props['placeholder-hour'] = '';
                }
                if(typeof props['placeholder-minute']=='undefined'){
                    props['placeholder-minute'] = '';
                }
                break;
            case 'radioButtons':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                break;
            case 'checkBoxes':
                if(typeof props.name=='undefined'){
                    props.name = '';
                }
                break;
            default:
                break;
        }
        return props;
    }
};

export default SchemaHelper;