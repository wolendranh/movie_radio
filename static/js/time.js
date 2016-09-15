import schedule from 'node-schedule';
import $ from 'jquery';


//#TODO: create scheduler for CSS animation
var self = module.exports = {
    schedule: function () {
        $( document ).ready(function() {
            var rule = new schedule.RecurrenceRule();
            rule.hour = 12;
            rule.minute = 22;
            schedule.scheduleJob(rule, function(){
               alert('sheduled');
            });
        });

    }
};

