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
import SchemaStore from '../../schema/SchemaStore'

export const DatePicker = React.createClass({
    getSchemaElement(){
        return SchemaStore.getSchemaElement({FormID:this.props.FormID,ElementID:this.props.ElementID});
    },
    // get props element from schema
    getPropsElementFromSchema(){
        return SchemaStore.getPropsElementFromSchema({FormID:this.props.FormID,ElementID:this.props.ElementID});
    },
    getSettings(){
        return this.settings;
    },
    componentWillUnmount(){
        window.removeEventListener("click",this.windowClickListener);
    },
    // helper for overlay
    show:false,
    windowClickListener:function (e) {
        if(!this.show){
            this.hideCalendar();
        }else{
            this.showCalendar();
        }
    },
    // hide calendar if click anywhere
    hideIfClickAnywhere(){
        let _this = this;
        let calendar = ReactDOM.findDOMNode(this.refs.calendar);
        this.show = false;
        calendar.addEventListener("click", function (e) {
            //e.stopPropagation();
            _this.show  = true;
            setTimeout(function () {
                _this.show = false;
            },400)
        }, true);
        window.addEventListener("click",this.windowClickListener, false);
    },
    // init settings element form
    initSettingsElement(){
        let DateObj = new window.Date();
        console.log( this.getPropsElementFromSchema());
        this.settings = {
            "month": DateObj.getMonth() + 1,
            "day": DateObj.getDate(),
            "year": DateObj.getFullYear(),
            "rangeYears": this.getPropsElementFromSchema()["range-years"],
            "showCalendar":false,
            "showBottom":true
        };
    },
    componentWillMount(){
        this.initSettingsElement();
    },
    componentDidMount(){
        this.hideIfClickAnywhere();
    },
    hideCalendar(){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        settings.showCalendar = false;
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onHide({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:this.props.value_data}});
    },
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
    },
    showCalendar(){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        settings.showCalendar = true;
        if(this.showOnBottom()){
            settings.showBottom = true;
        }else{
            settings.showBottom = false;
        }
        // send events with dispatcher to form
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:this.props.value_data}});
    },
    // select next month
    nextMonth(){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        settings.month++;
        if(settings.month>12){settings.month=1}
        // send events with dispatcher to form
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:this.props.value_data}});
    },
    // select previous month
    prevMonth(){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        settings.month--;
        if(settings.month<=0){settings.month=12}
        // send events with dispatcher to form
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:this.props.value_data}});
    },
    // select day handler
    selectDay(event){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        settings.day = event.target.getAttribute('data-day');
        let value_data = this.props.value_data;
        if(value_data==''){
            value_data = {};
        }
        value_data.day = settings.day;
        value_data.month = settings.month;
        value_data.year = settings.year;
        // send events with dispatcher to form
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:value_data,value:this.getFormattedDate()}});
    },
    // select month handler
    selectMonth(event) {
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        settings.month = event.target.value;
        // send events with dispatcher to form
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:this.props.value_data}});
    },
    // select year handler
    selectYear(event){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        settings.year = event.target.value;
        // send events with dispatcher to form
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:this.props.value_data}});
    },
    // count days in month
    daysInMonth(year,month) {
        var monthStart = new Date(year, month, 1);
        var monthEnd = new Date(year, month + 1, 1);
        var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
        return monthLength;
    },
    //info from date props component
    getCalendarInfo() {
        let settings = this.getSettings();
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
    },
    getMask(){
        let schema = this.getSchemaElement();
        return schema.props.mask || 'DD.MM.YYYY hh:mm';
    },
    // get formatted date value
    getFormattedDate(){
        let mask = this.getMask();
        let value = this.props.value_data;
        if(value == ''){
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
    },
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
        let ValueDay = this.props.value_data.day;
        let ValueMonth = this.props.value_data.month;
        let ValueYear = this.props.value_data.year;
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
    },
    changeHourHandler(event){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        let value_data = this.props.value_data;
        if(typeof value_data=='object'){
            value_data.hour = Math.abs(parseInt(event.target.value));
            if(value_data.hour>23) value_data.hour =23;
            // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
            this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:value_data,value:this.getFormattedDate()}});
        }
    },
    changeMinuteHandler(event){
        let schemaElement = this.getSchemaElement();
        let settings = this.getSettings();
        let value_data = this.props.value_data;
        if(typeof value_data=='object'){
            value_data.minute = Math.abs(parseInt(event.target.value));
            if(value_data.minute>59) value_data.minute =59;
            // send events with dispatcher to form
            this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{value_data:value_data,value:this.getFormattedDate()}});
        }
    },
    render: function(){
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
        console.log(this.getSettings());
        let _this = this;
        let years = this.getSettings().rangeYears.split('-');
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
        if(this.getSettings().showBottom){
            classShowBottom =' datepicker-show-bottom';
        }
        // hours and minutes
        let propsSchema = this.getPropsElementFromSchema();
        let placeholderHour =  propsSchema['placeholder-hour'];
        let placeholderMinute =  propsSchema['placeholder-minute'];

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
                                    <input className="datepicker-hour" placeholder={placeholderHour} value={_this.props.value_data.hour || ''} onChange={_this.changeHourHandler}/> <input className="datepicker-minute" placeholder={placeholderMinute} value={_this.props.value_data.minute || ''} onChange={_this.changeMinuteHandler}/>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
            );
    }
});

export default DatePicker;