import $ from 'jquery';

const MORNING = 'morning';
const DAY = 'day';
const EVENING = 'evening';

var DAY_TIME = '';


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


var self = module.exports = {
    triggerChange: function (dayTime) {
        var filter = new Filter();
        switch (dayTime) {
            case DAY_TIME:
                break;
            case MORNING:
                DAY_TIME = MORNING;
                filter.eveningToMorning();
                break;
            case EVENING:
                DAY_TIME = EVENING;
                filter.dayToEvening();
                break;
            case DAY:
                DAY_TIME = DAY;
                filter.morningToDay();
                break;
        }
    }
};



