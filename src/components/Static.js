/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import { _typeof } from '../Helper';

const Static = React.createClass({
    getSchemaElement(){
        return this.props.schemaElement;
    },
    render() {
        let _this = this;
        let schemaElement = this.getSchemaElement();
        let container_class = _typeof(schemaElement, "classes", "container") || '';
        let style = {"display":"inline-block"};
        if(container_class!=''){
            style = {};
        }
        function createMarkup() { return {__html: _this.props.html}; }
        return(
            <div className={container_class} style={style} dangerouslySetInnerHTML={createMarkup()} />
        );
    }
});

export default Static;