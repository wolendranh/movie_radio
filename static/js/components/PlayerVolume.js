import {render} from 'react-dom'
import React from 'react'
import $ from 'jquery';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/ui/widgets/draggable';

var Volume = React.createClass({

  propTypes: {
      classes: React.PropTypes.array,
      volumes: React.PropTypes.object
  },

  componentDidMount: function () {
    'use strict';
        $('.slider').bind('mousewheel DOMMouseScroll', function (e) {
            var delta = 0, element = $(this), value, result, oe;
            oe = e.originalEvent; // for jQuery >=1.7
            value = element.slider('value');

            if (oe.wheelDelta) {
                delta = -oe.wheelDelta;
            }
            if (oe.detail) {
                delta = oe.detail * 40;
            }

            value -= delta / 8;
            if (value > 100) {
                value = 100;
            }
            if (value < 0) {
                value = 0;
            }

            result = element.slider('option', 'slide').call(element, e, { value: value });
            if (result !== false) {
                element.slider('value', value);
            }
            return false;
        });
        var that = this;

        var x = 10;
        if(x => 0 && x <= 0.2){
            console.log()
        }else if (x > 0.2 && x <= 0.4){
            console.log()
        }

        $(function () {
            $('.slider').slider({
                slide: function slide(event, ui) {
                    var x = ui.value / 100;
                    $('.value').val(x);
                    var liquid= document.querySelector('.liquid');
                    liquid.style.width = ui.value + '%';
                    console.log(x);
                    that.props.setVolumeHandle(x);
                }

            });
            $('.slider').on('slide', (event, ui) => console.log(ui));
            $('.slider').draggable();
        });
  },

  getDefaultProps: function() {
    // sets default array of props
    return {
      classes: ['one', 'two', 'three', 'four', 'five'],
      volumes: {'one': 0.2, 'two': 0.4, 'three': 0.6, 'four': 0.8, 'five': 1}
    };
  },


  soundHandler: function(bar, event) {
    var soundValue = this.props.volumes[bar];
    // call method of parent component (Player)
    this.props.setVolumeHandle(soundValue);
    this.forceUpdate();
  },

  getClass: function(i){
      var volume = this.props.getVolumeHandle();
      var barVolume = this.props.volumes[i];
      if (barVolume <= volume){
        return 'volume-bar red ' + i;
      }
      return 'volume-bar ' + i;

  },

  render: function () {
    //   var bars = this.props.classes.map((i, index) => {
    //   return <div key={index} className={this.getClass(i)} onClick={(evt) => this.soundHandler(i, evt)}></div>;
    // });
      // svg styles
      var style = {
          fill: 'black',
          fillOpacity: 0.1
      };

    return (
    <div className="track-and-volume-wrapper">

        <div className="trackInfoWrapper">
            <div className="trackInfo marquee">
                   <p className="current-song">{this.props.song }</p>
            </div>
        </div>
        

    </div>
    )
  }
});

export default Volume;