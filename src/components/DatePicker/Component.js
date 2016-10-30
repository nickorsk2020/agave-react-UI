/*
 * This file is part of the "Agave react UI" package
 *
 * Copyright (c) 2016 Stepanov Nickolay <nickorsk2020@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * */

import React from 'react';
import ReactDOM from 'react-dom'
import { deepClone } from '../../Helper'
import Component from '../classes/Component'
import PrivateSettings from './PrivateSettings'

class DatePicker extends Component
{
    binding(){
        this.windowClickListener = this.windowClickListener.bind(this);
        this.hideIfClickAnywhere = this.hideIfClickAnywhere.bind(this);
        this.setValueFromSchema = this.setValueFromSchema.bind(this);
        this.parseValueDate = this.parseValueDate.bind(this);
        this.showOnBottom = this.showOnBottom.bind(this);
        this.hideCalendar = this.hideCalendar.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.selectMonth = this.selectMonth.bind(this);
        this.selectYear = this.selectYear.bind(this);
        this.changeHourHandler = this.changeHourHandler.bind(this);
        this.changeMinuteHandler = this.changeMinuteHandler.bind(this);
        this.daysInMonth = this.daysInMonth.bind(this);
        this.getCalendarInfo = this.getCalendarInfo.bind(this);
        this.getMask = this.getMask.bind(this);
        this.getFormattedDate = this.getFormattedDate.bind(this);
        this.renderCalendar = this.renderCalendar.bind(this);
    }
    constructor(props){
        super(props);
        this.binding();
    }
    componentWillUnmount(){
        window.removeEventListener("click",this.windowClickListener);
    }
    windowClickListener(e) {
        if(!this.getSettings().showCalendar && !this.show) return;
        if(!this.show){
            this.hideCalendar();
        }else{
            this.showCalendar();
        }
    }
    // hide calendar if click anywhere
    hideIfClickAnywhere(){
        let _this = this;
        let calendar = ReactDOM.findDOMNode(this.refs.calendar);
        this.show = false;
        calendar.addEventListener("click", function (e) {
            //e.stopPropagation();
            _this.show  = true;
            _this.calendarClick = true;
            setTimeout(function () {
                _this.show = false;
            },400)
        }, true);
        window.addEventListener("click",this.windowClickListener, false);
    }
    componentWillMount(){
        this.initSettingsElement(PrivateSettings);
        this.setValueFromSchema();
    }
    componentDidMount(){
        this.hideIfClickAnywhere();
    }
    // set value from schema
    setValueFromSchema(){
        let value = this.getValueElement();
        if(value.length>0){
            let settings = deepClone(this.getSettings());
            let parseValueDate = this.parseValueDate();
            settings.month = parseValueDate.month;
            settings.day = parseValueDate.day;
            settings.year = parseValueDate.year;
            settings.valueSettings = parseValueDate;
            this.setSettings(settings);
        }
    }
    // parse value to valueSettings of PrivateSettings
    parseValueDate(){
        let mask = this.getMask();
        let value = this.getValueElement();
        let day = value.substring(mask.indexOf('DD'),mask.indexOf('DD')+2);
        let month = value.substring(mask.indexOf('MM'),mask.indexOf('MM')+2);
        let year = value.substring(mask.indexOf('YYYY'),mask.indexOf('YYYY')+4);
        let hour = value.substring(mask.indexOf('hh'),mask.indexOf('hh')+2);
        let minute = value.substring(mask.indexOf('mm'),mask.indexOf('mm')+2);
        return {
            day:day,
            month:month,
            year:year,
            hour:hour,
            minute:minute
        }
    }
    // show overlay on top or bottom?
    showOnBottom(){
        let calendar = ReactDOM.findDOMNode(this.refs.calendar);
        var viewportOffset = calendar.getBoundingClientRect();
        var top = viewportOffset.top;
        if((window.innerHeight - top)>300){
            return true;
        }else{
            return false;
        }
    }
    hideCalendar(){
        let settings = deepClone(this.getSettings());
        settings.showCalendar = false;
        this.setSettings(settings);
        // send events with dispatcher to form
        this.props.handle.onChangeSettings({ElementID:this.props.ElementID,Value:this.getValueElement()});
    }
    showCalendar(){
        let settings = deepClone(this.getSettings());
        settings.showCalendar = true;
        this.showOnBottom() ? settings.showBottom = true:settings.showBottom = false;
        this.setSettings(settings);
        // send events with dispatcher to form
        this.props.handle.onChangeSettings({ElementID:this.props.ElementID,Value:this.getValueElement()});
    }
    // select next month
    nextMonth(){
        let settings = deepClone(this.getSettings());
        settings.month++;
        if(settings.month>12){settings.month=1}
        this.setSettings(settings);
        // send events with dispatcher to form
        this.props.handle.onChangeSettings({ElementID:this.props.ElementID,Value:this.getValueElement()});
    }
    // select previous month
    prevMonth(){
        let settings = deepClone(this.getSettings());
        settings.month--;
        if(settings.month<=0){settings.month=12}
        this.setSettings(settings);
        // send events with dispatcher to form
        this.props.handle.onChangeSettings({ElementID:this.props.ElementID,Value:this.getValueElement()});
    }
    // select day handler
    selectDay(event){
        let settings = deepClone(this.getSettings());
        settings.day = event.target.getAttribute('data-day');
        if(settings.valueSettings == null){
            settings.valueSettings = {};
        }
        settings.valueSettings.day = settings.day;
        settings.valueSettings.month = settings.month;
        settings.valueSettings.year = settings.year;
        this.setSettings(settings);
        // send events with dispatcher to form
        this.props.handle.onChange({ElementID:this.props.ElementID,Value:this.getFormattedDate()});
    }
    // select month handler
    selectMonth(event) {
        let settings = deepClone(this.getSettings());
        settings.month = event.target.value;
        this.setSettings(settings);
        // send events with dispatcher to form
        this.props.handle.onChangeSettings({ElementID:this.props.ElementID,Value:this.getValueElement()});
    }
    // select year handler
    selectYear(event){
        let settings = deepClone(this.getSettings());
        settings.year = event.target.value;
        this.setSettings(settings);
        // send events with dispatcher to form
        this.props.handle.onChangeSettings({ElementID:this.props.ElementID,Value:this.getValueElement()});
    }
    // select hour
    changeHourHandler(event){
        let settings = deepClone(this.getSettings());
        if(typeof settings.valueSettings=='object'){
            settings.valueSettings.hour = Math.abs(parseInt(event.target.value));
            if( settings.valueSettings.hour>23)  settings.valueSettings.hour =23;
            this.setSettings(settings);
            // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
            this.props.handle.onChange({ElementID:this.props.ElementID,Value:this.getFormattedDate()});
        }
    }
    // select minute
    changeMinuteHandler(event){
        let settings = deepClone(this.getSettings());
        if(typeof settings.valueSettings=='object'){
            settings.valueSettings.minute = Math.abs(parseInt(event.target.value));
            if(settings.valueSettings.minute>59) settings.valueSettings.minute =59;
            this.setSettings(settings);
            // send events with dispatcher to form
            this.props.handle.onChange({ElementID:this.props.ElementID,Value:this.getFormattedDate()});
        }
    }
    // count days in month
    daysInMonth(year,month) {
        var monthStart = new Date(year, month, 1);
        var monthEnd = new Date(year, month + 1, 1);
        var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
        return monthLength;
    }
    //info from date props component
    getCalendarInfo() {
        let settings = deepClone(this.getSettings());
        let Day =settings.day;
        let Month =settings.month;
        let Year = settings.year;
        var firstDay = new window.Date(Year,Month-1, 1);
        let days = this.daysInMonth(Year,Month-1);
        let numFirstDay = firstDay.getDay();
        // fix sunday
        if(numFirstDay==0){
            numFirstDay = 7;
        }
        return {
            days:days,
            numFirstDay:numFirstDay,
            firstDay:firstDay,
            day:Day,
            month:Month,
            year:Year
        };
    }
    // get mask date
    getMask(){
        let schema = this.getSchemaElement();
        return schema.props.mask || 'DD.MM.YYYY hh:mm';
    }
    // get formatted date string
    getFormattedDate(){
        let mask = this.getMask();
        let settings = this.getSettings();
        let value =  settings.valueSettings;
        if(value == null){
            let propsSchema = this.getPropsElementFromSchema();
            return propsSchema.placeholder;
        }
        let day = value.day;
        if(day<10){
            day='0'+day;
        }
        let month = value.month;
        if(month<10){
            month='0'+month;
        }
        let result = mask.replace("DD",day).replace("MM",month).replace("YYYY",value.year);
        if(typeof value.hour!='undefined'){
            let hour = parseInt(value.hour) || 0;
            if(hour<10){
                hour='0'+hour;
            }
            let minute = parseInt(value.minute) || 0;
            if(minute<10){
                minute='0'+minute;
            }
            if(hour==''){
                minute = '';
            }
            // replace mask hour and minute
            if(result.indexOf('hh')>-1){
                result = result.replace('hh',hour);
            }
            if(result.indexOf('mm')>-1){
                result = result.replace('mm',minute);
            }
        }else{
            result = result.substring(0,result.indexOf('hh')).trim();
        }
        return result;
    }
    // render calendar days
    renderCalendar(){
        let calendarInfo = this.getCalendarInfo();
        let numFirstDay = calendarInfo.numFirstDay;
        let days = calendarInfo.days;
        let weeksCount = Math.ceil((days+(numFirstDay+1))/7);
        let html = '';
        // selected date
        let SelectedDay = calendarInfo.day;
        let SelectedMonth = calendarInfo.month;
        let SelectedYear = calendarInfo.year;
        // current date
        let currentData = new window.Date();
        let currentDay = currentData.getDate();
        let currentMonth = currentData.getMonth()+1;
        let currentYear = currentData.getFullYear();
        // date from real value
        let settings = this.getSettings();
        let ValueDay =  settings.valueSettings!=null ? settings.valueSettings.day : null;
        let ValueMonth = settings.valueSettings!=null ? settings.valueSettings.month : null;
        let ValueYear = settings.valueSettings!=null ? settings.valueSettings.year : null;
        let Day = 1;
        let classDay = '';
        let WeekData = [];
        let DaysData = [];
        for(let w=1;w<=weeksCount;w++){
            DaysData = [];
            for(let n=1;n<=7;n++) {
                classDay = '';
                if (currentDay == Day && currentMonth == SelectedMonth && currentYear == SelectedYear) {
                    classDay = 'datepicker-current-day';
                }
                if(Day==ValueDay && ValueMonth == SelectedMonth && ValueYear == SelectedYear){
                    classDay += ' datepicker-selected-day';
                }
                if (w == 1) {
                    if (n == numFirstDay || n > numFirstDay) {
                        DaysData.push(<td key={Day} className={classDay}><a data-day={Day} onClick={this.selectDay}>{Day}</a></td>);
                        Day++;
                    } else {
                        DaysData.push(<td key={w+''+n}>{ }</td>);
                    }
                } else {
                    if (Day <= days) {
                        DaysData.push(<td key={Day} className={classDay}><a data-day={Day} onClick={this.selectDay}>{Day}</a></td>);
                        Day++;
                    }
                }
            }
            WeekData.push(<tr key={w}>
                {DaysData}
            </tr>);
        }
        return WeekData;
    }
    render(){
        let style =  `
        .datepicker-container
        {
            position:relative;
            z-index:100;
            background:#fff;
        }
        .datepicker
        {
            border:1px solid #ccc;
            box-sizing:border-box;
            display:inline-block;
            width:100%;
            margin-top:2px;
            border-radius:4px;
            background:#f5f5f5;
            position:absolute;
            bottom:38px;
            top:initial;
            left:0;
            z-index:100;
            -webkit-box-shadow: 10px 10px 5px -8px rgba(0,0,0,0.75);
            -moz-box-shadow: 10px 10px 5px -8px rgba(0,0,0,0.75);
            box-shadow: 10px 10px 5px -8px rgba(0,0,0,0.75);
        }
        .datepicker.datepicker-show-bottom
        {
            top:38px !important;
            bottom: initial;
        }
        .datepicker hr
        {
            background:#ccc;
            color:#ccc;
            border-color:#ccc;
        }
        .datepicker-table {
            width:100%;
            max-width:268px;
            margin:0 auto;
            border:0;
            border-collapse:collapse !important;
            border-spacing:0 !important;
        }
        .datepicker-table th
        {
            width:14%;
            text-align:center;
            color:#337ab7;
        } 
        .datepicker-table th.week-end
        {
            color:#a7a7a7;
        }
        .datepicker-table-days td
        {
            text-align:center;
        }
        .datepicker-table-days td a
        {
            width:30px;
            height:30px;
            line-height:28px;
            display:inline-block;
            cursor:pointer;
            color:#696969;
            font-weight:bolder;
        }
        .datepicker-table-days td a:hover
        {
           background:#337ab7;
           color:#fff;
           border-radius:100%;
        }
        .datepicker-table-days .datepicker-current-day a
        {
            color:#337ab7;
            border-radius:100%;
            border:2px solid #337ab7;
            box-size:border-box;
        }
        .datepicker-table-days .datepicker-selected-day a
        {
           background:#337ab7;
           color:#fff;
           border-radius:100%;
        }
        .datepicker-panel
        {
            text-align:center;
            position:relative;
        }
        .datepicker-panel-select
        {
            display:inline-block;
            padding:10px 0 8px 0;
        }
        .datepicker-panel-select select
        {
            display:inline-block;
            background:transparent;
            border:none;
            -webkit-appearance:none;
            appearance:none;
        }
         .datepicker-panel-select select:focus
        {
            border:none;
            outline: none;
        }
        .datepicker-panel-right-btn,
        .datepicker-panel-left-btn
        {
            font-size:25px;
            color:#696969;
            cursor:pointer;
            position:absolute;
            top:10px;
            background: #636161;
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            border-radius: 100%;
            color:#fff;
            font-weight:bolder;
            text-align:center;
        }
         .datepicker-panel-right-btn:hover,
        .datepicker-panel-left-btn:hover
        {
            color:#fff;
        }
         .datepicker-panel-left-btn
        {
           left:10px;
        }
         .datepicker-panel-right-btn
        {
            right:10px;
        }
        .datepicker-value
        {
            width:100%;
            height:34px;
            line-height:34px;
            padding-left:12px;
            box-size:border-box;
            border:1px solid #ccc;
            border-radius:4px;
        }
        .datepicker-time-container
        {
            display:inline-block;
            text-align:center;
            width: 100%;
        }
        .datepicker-minute,
        .datepicker-hour
        {
            margin:10px 0;
            padding-left:10px;
            box-size:border-box;
            width:150px;
            text-align:center;
        }
        `;
        let _this = this;
        let settings = this.getSettings();
        let years = settings.rangeYears.split('-');
        let yearsDiapason = parseInt(years[1]) -  parseInt(years[0])+1;
        if(yearsDiapason<0){
            console.error("Wrong range of years, see your Schema");
        }

        let selectYearData = [];
        for(let y=1;y<=yearsDiapason;y++){
            let year = (parseInt(years[0])+y)-1;
            selectYearData.push(<option key={year} value={year}>{year}</option>);
        }

        // showBottom??
        let classShowBottom = '';
        if(settings.showBottom){
            classShowBottom =' datepicker-show-bottom';
        }
        // hours and minutes
        let propsSchema = this.getPropsElementFromSchema();
        let placeholderHour =  propsSchema['placeholder-hour'];
        let placeholderMinute =  propsSchema['placeholder-minute'];
        let hour = settings.valueSettings!=null ? (settings.valueSettings.hour || '') : '';
        let minute = settings.valueSettings!=null ? (settings.valueSettings.minute || ''): '';
        return(
            <div ref="calendar" className="datepicker-container" tabIndex="0">
                <div className="datepicker-value">{this.getFormattedDate()}</div>
                <style>
                    {style}
                </style>
                {(function(){
                    if(_this.getSettings().showCalendar){
                        return (
                            <div className={("datepicker"+classShowBottom)}>
                                <div className="datepicker-panel">
                                    <a onClick={_this.prevMonth} className="datepicker-panel-left-btn">&lang;</a>
                                    <a onClick={_this.nextMonth} className="datepicker-panel-right-btn">&rang;</a>
                                    <div className="datepicker-panel-select">
                                        <select value={_this.getSettings().month} onChange={_this.selectMonth} ref="selectMonth_el">
                                            <option value="1">
                                                Январь
                                            </option>
                                            <option value="2">
                                                Февраль
                                            </option>
                                            <option value="3">
                                                Март
                                            </option>
                                            <option value="4">
                                                Апрель
                                            </option>
                                            <option value="5">
                                                Май
                                            </option>
                                            <option value="6">
                                                Июнь
                                            </option>
                                            <option value="7">
                                                Июль
                                            </option>
                                            <option value="8">
                                                Август
                                            </option>
                                            <option value="9">
                                                Сентябрь
                                            </option>
                                            <option value="10">
                                                Октябрь
                                            </option>
                                            <option value="11">
                                                Ноябрь
                                            </option>
                                            <option value="12">
                                                Декабрь
                                            </option>
                                        </select>
                                        &nbsp;&nbsp;&nbsp;
                                        <select value={_this.getSettings().year} onChange={_this.selectYear}>
                                            {selectYearData}
                                        </select>
                                    </div>

                                </div>
                                <hr/>
                                <table className="datepicker-table">
                                    <thead>
                                    <tr>
                                        <th>Пн</th>
                                        <th>Вт</th>
                                        <th>Ср</th>
                                        <th>Чт</th>
                                        <th>Пт</th>
                                        <th className="week-end">Сб</th>
                                        <th className="week-end">Вс</th>
                                    </tr>
                                    </thead>
                                    <tbody className="datepicker-table-days">{_this.renderCalendar()}</tbody>
                                </table>
                                <div className="datepicker-time-container">
                                    <hr/>
                                    <input className="datepicker-hour" placeholder={placeholderHour} value={hour} onChange={_this.changeHourHandler}/>
                                    <input className="datepicker-minute" placeholder={placeholderMinute} value={minute} onChange={_this.changeMinuteHandler}/>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
            );
    }
}

export default DatePicker;