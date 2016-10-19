/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import  { Button } from 'react-bootstrap';

const Submit = React.createClass({
    render() {
        return(
            <Button className={this.props.className} onClick={this.props.onSubmit}>{this.props.name}</Button>
        );
    }
});

export default Submit;