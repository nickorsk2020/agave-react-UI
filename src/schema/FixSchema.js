/**
 * Created by nick on 26.10.16.
 */
import { deepClone } from '../Helper'

const FixSchema = {
    // fix schema
    fix(Schema){
        // schema form
        const schema = deepClone(Schema);
        // elements form
        let elements = schema.elements;
        for(let key in elements){
            schema.elements[key].classes = this.getModifyClasses(schema.elements[key]);
            schema.elements[key].props = this.getModifyProps(schema.elements[key]);
        }
        return schema;
    },
    getSchemaClasses(Element){
        return Element.classes || {};
    },
    getSchemaProps(Element){
        return Element.props || {};
    },
    getTypeElement(Element){
        return Element.type;
    },
    // get or modify classes
    getModifyClasses(Element){
        let classes = this.getSchemaClasses(Element);
        switch (this.getTypeElement(Element)) {
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
    },
    // get or modify props
    getModifyProps(Element){
        let props = this.getSchemaProps(Element);
        switch (this.getTypeElement(Element)) {
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

export default FixSchema;