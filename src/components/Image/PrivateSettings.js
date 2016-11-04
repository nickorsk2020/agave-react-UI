/**
 * Created by nick on 28.10.16.
 */

const PrivateSettings = class {
    constructor(Element){
        this.Element = Element;
        this.settings = this.initSettings();
    }
    initSettings(){
        this.settings = {
            Reader:new FileReader()
        };
        return this.settings;
    }
    setSettings(Settings){
        this.settings = Settings;
        return this.getSettings();
    }
    getSettings(){
        return this.settings;
    }
};

export default PrivateSettings;