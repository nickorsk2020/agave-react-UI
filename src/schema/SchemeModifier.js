/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

class SchemeModifier {
  constructor(scheme){
    this.scheme = scheme;
  }
  getElements(){
    return this.getScheme().elements || [];
  }
  getScheme(){
    return this.scheme;
  }
  changeValue(elementID, value){
    let elements = this.getElements();
    for(let e=0; e<elements.length; e++){
      if(e == elementID){
        elements[e].value = value;
      }
    }
  }
};

export default SchemeModifier;