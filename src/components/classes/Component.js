/**
 * Created by nick on 30.10.16.
 */
import React from 'react'
import SchemaStore from '../../schema/SchemaStore'

class Component extends React.Component
{
    _binding(){
        this.getSchemaElement = this.getSchemaElement.bind(this);
        this.getPropsElementFromSchema = this.getPropsElementFromSchema.bind(this);
        this.setSettings = this.setSettings.bind(this);
        this.getSettings = this.getSettings.bind(this);
        this.getValueElement = this.getValueElement.bind(this);
        this.initSettingsElement = this.initSettingsElement.bind(this);
    }
    constructor(props){
        super(props);
        this._binding();
    }
    getSchemaElement(){
        return SchemaStore.getSchemaElement({FormID:this.props.FormID,ElementID:this.props.ElementID});
    }
    // get props element from schema
    getPropsElementFromSchema(){
        return SchemaStore.getPropsElementFromSchema({FormID:this.props.FormID,ElementID:this.props.ElementID});
    }
    // set private settings
    setSettings(Settings){
        return this.settings.setSettings(Settings);
    }
    // get private settings
    getSettings(){
        return this.settings.getSettings();
    }
    // get value element form
    getValueElement(){
        return this.props.value;
    }
    // init settings element form
    initSettingsElement(PrivateSettings){
        this.settings = new PrivateSettings(this);
    }
}
export default Component;