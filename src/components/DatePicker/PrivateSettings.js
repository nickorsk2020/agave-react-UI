/**
 * Created by nick on 28.10.16.
 */

const PrivateSettings = class {
    constructor(Element){
        this.Element = Element;
        this.settings = this.initSettings();
    }
    initSettings(){
        let DateObj = new window.Date();
        this.settings = {
            "month": DateObj.getMonth() + 1,
            "day": DateObj.getDate(),
            "year": DateObj.getFullYear(),
            "rangeYears": this.Element.getPropsElementFromSchema()["range-years"],
            "showCalendar":false,
            "showBottom":true,
            "valueSettings":null
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