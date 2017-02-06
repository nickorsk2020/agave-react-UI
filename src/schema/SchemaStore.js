/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

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