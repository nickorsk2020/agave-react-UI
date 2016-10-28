/**
 * Created by nick on 26.10.16.
 */
import FixSchema from './FixSchema'

const SchemaStore = {
    schemes:{},
    // set schema form
    setSchema(Schema){
        this.schemes[Schema.FormID] = FixSchema.fix(Schema);
    },
    // get schema form
    getSchemaForm(FormID){
        for(let key in this.schemes){
            if(key == FormID){
                return this.schemes[key];
            }
        }
        return null;
    },
    // get elements form
    getElementsForm(FormID){
        return this.getSchemaForm(FormID).elements;
    },
    //get schema element
    getSchemaElement({ FormID, ElementID }){
        let Elements = this.getElementsForm(FormID);
        for(let key in Elements){
            if(key == ElementID){
                return Elements[key];
            }
        }
        return null;
    },
    // get props of element from schema
    getPropsElementFromSchema({ FormID, ElementID }){
        let Element = this.getSchemaElement({ FormID, ElementID });
        return Element.props;
    }
};

export default SchemaStore;