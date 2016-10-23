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

const DatePicker = React.createClass({
    getSchemaElement(){
        return this.props.schemaElement;
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
    componentDidMount(){
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
    hideCalendar(){
        let schemaElement = this.getSchemaElement();
        let date = Object.assign({},this.props.SelectedDate);
        date.showCalendar = false;
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onHide({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:this.props.value}});
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
        let date = Object.assign({},this.props.SelectedDate);
        date.showCalendar = true;
        if(this.showOnBottom()){
            date.showBottom = true;
        }else{
            date.showBottom = false;
        }
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:this.props.value}});
    },
    // select next month
    nextMonth(){
        let schemaElement = this.getSchemaElement();
        let date = Object.assign({},this.props.SelectedDate);
        date.month++;
        if(date.month>12){date.month=1}
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:this.props.value}});
    },
    // select previous month
    prevMonth(){
        let schemaElement = this.getSchemaElement();
        let date = Object.assign({},this.props.SelectedDate);
        date.month--;
        if(date.month<=0){date.month=12}
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:this.props.value}});
    },
    // select day handler
    selectDay(event){
        let schemaElement = this.getSchemaElement();
        let date = Object.assign({},this.props.SelectedDate);
        date.day = event.target.getAttribute('data-day');
        let value = this.props.value;
        if(value==''){
            value = Object.assign({},date);
        }
        value.day = date.day;
        value.month = date.month;
        value.year = date.year;
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:value}});
    },
    // select month handler
    selectMonth(event) {
        let schemaElement = this.getSchemaElement();
        let date = Object.assign({},this.props.SelectedDate);
        date.month = event.target.value;
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:this.props.value}});
    },
    // select year handler
    selectYear(event){
        let schemaElement = this.getSchemaElement();
        let date = Object.assign({},this.props.SelectedDate);
        date.year = event.target.value;
        // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
        this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:this.props.value}});
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
        let Date = this.props.SelectedDate;
        let Day =Date.day;
        let Month =Date.month;
        let Year = Date.year;
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
    // get formatted date value
    getFormattedDate(){
        let value = this.props.value;
        let schemaElement = this.getSchemaElement();
        if(typeof value=='string'){
            let props = this.props.ElementProps;
            return props.placeholder;
        }
        let day = value.day;
        if(day<10){
            day='0'+day;
        }
        let month = value.month;
        if(month<10){
            month='0'+month;
        }
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
        return day+'.'+month+'.'+value.year+' '+hour+':'+minute;
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
        let ValueDay = this.props.value.day;
        let ValueMonth = this.props.value.month;
        let ValueYear = this.props.value.year;

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
        let date = Object.assign({},this.props.SelectedDate);
        let value = this.props.value;
        if(typeof value=='object'){
            value.hour = Math.abs(parseInt(event.target.value));
            if(value.hour>23) value.hour =23;
            // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
            this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:value}});
        }
    },
    changeMinuteHandler(event){
        let schemaElement = this.getSchemaElement();
        let date = Object.assign({},this.props.SelectedDate);
        let value = this.props.value;
        if(typeof value=='object'){
            value.minute = Math.abs(parseInt(event.target.value));
            if(value.minute>59) value.minute =59;
            // отправляем событие через диспетчер в форму c ID елемента, его схемой и значением
            this.props.handle.onChange({ElementID:this.props.ElementID,Element:schemaElement,Value:{date:date,value:value}});
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
        let _this = this;
        // years diapason
        let years = this.props.SelectedDate.rangeYears.split('-');
        let yearsDiapason = parseInt(years[1]) -  parseInt(years[0])+1;
        if(yearsDiapason<0){
            console.error("Wrong range of years, see Schema");
        }

        let selectYearData = [];
        for(let y=1;y<=yearsDiapason;y++){
            let year = (parseInt(years[0])+y)-1;
            selectYearData.push(<option key={year} value={year}>{year}</option>);
        }

        // showBottom??
        let classShowBottom = '';
        if(this.props.showBottom){
            classShowBottom =' datepicker-show-bottom';
        }
        // hours and minutes
        let props = this.props.ElementProps;
        let placeholderHour =  props['placeholder-hour'];
        let placeholderMinute =  props['placeholder-minute'];

        return(
            <div ref="calendar" className="datepicker-container" tabIndex="0">
                <div className="datepicker-value">{this.getFormattedDate()}</div>
                <style>
                    {style}
                </style>
                {(function(){
                    if(_this.props.show){
                        return (
                            <div className={("datepicker"+classShowBottom)}>
                                <div className="datepicker-panel">
                                    <a onClick={_this.prevMonth} className="datepicker-panel-left-btn">&lang;</a>
                                    <a onClick={_this.nextMonth} className="datepicker-panel-right-btn">&rang;</a>
                                    <div className="datepicker-panel-select">
                                        <select value={_this.props.SelectedDate.month} onChange={_this.selectMonth} ref="selectMonth_el">
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
                                        <select value={_this.props.SelectedDate.year} onChange={_this.selectYear}>
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
                                    <input className="datepicker-hour" placeholder={placeholderHour} value={_this.props.value.hour || ''} onChange={_this.changeHourHandler}/> <input className="datepicker-minute" placeholder={placeholderMinute} value={_this.props.value.minute || ''} onChange={_this.changeMinuteHandler}/>
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