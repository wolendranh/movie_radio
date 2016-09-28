import schedule from 'node-schedule';
import $ from 'jquery';


var Filter = class Filter {
    constructor(){

    }

    resetClasses(){
        $('body').removeClass('morning-day', 'day-evening', 'evening-morning');
    }

    morningToDay(){
        this.resetClasses();
        $('body').addClass('morning-day');
    }

    dayToEvening(){
        this.resetClasses();
        $('body').addClass('day-evening');
    }

    eveningToMorning(){
        this.resetClasses();
        $('body').addClass('evening-morning');
    }
};



//#TODO: create scheduler for CSS animation
var self = module.exports = {
    scheduleFilters: function () {
        $( document ).ready(function() {
            var morningRule = new schedule.RecurrenceRule();
            var dayRule = new schedule.RecurrenceRule();
            var eveningRule = new schedule.RecurrenceRule();

            morningRule.hours = 11;
            morningRule.minutes = 58;

            dayRule.hours = 11;
            dayRule.minutes = 59;

            eveningRule.hours = 12;
            // eveningRule.minutes = 56;

            var filter = new Filter();

            // schedule.scheduleJob(morningRule, function(){
            //    filter.morningToDay();
            // });
            //
            // schedule.scheduleJob(dayRule, function(){
            //     filter.dayToEvening();
            // });
            //
            // schedule.scheduleJob(eveningRule, function(){
            //     filter.eveningToMorning();
            // });

            setTimeout(function() {

                filter.morningToDay();
                console.log($('body').attr("class").toString().split(' '))
            }, 1000);

            // filter.morningToDay();
            setTimeout(function() {
                filter.dayToEvening();
                console.log($('body').attr("class").toString().split(' '))
            }, 40000);
            setTimeout(function() {
                filter.eveningToMorning();
                console.log($('body').attr("class").toString().split(' '))
            }, 80000);

        });
    }
};



