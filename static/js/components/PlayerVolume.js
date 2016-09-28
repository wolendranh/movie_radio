import {render} from 'react-dom'
import React from 'react'
import $ from 'jquery';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/ui/widgets/draggable';

var Volume = React.createClass({

  setInitialVolume: function(){
      "use strict";
        var liquid= document.querySelector('.liquid');
        liquid.setAttribute("width", 50 + '%');
        this.props.setVolumeHandle(0.5);
  },

  componentDidMount: function () {
    'use strict';

     // set volume on start of app
     this.setInitialVolume();


     $('#phantom').on('mousewheel DOMMouseScroll', function (e) {
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
    $( "#phantom" ).slider({
      slide: function (event, ui) {
        if (event.type == 'slide' && ui.value == 100){return}
        var newVolume = ui.value / 100;
        var liquid= document.querySelector('.liquid');
        liquid.setAttribute("width", ui.value + '%');
        this.props.setVolumeHandle(newVolume);
      }.bind(this)
    })
  },

  render: function () {
      // svg styles
      var style = {
          fill: '#fa0000',
          fillOpacity: 0.1
      };

    return (
    <div className="track-and-volume-wrapper">

        <div className="trackInfoWrapper">
            <div className="trackInfo marquee">
                   <p className="current-song">{this.props.song }</p>
            </div>
        </div>
        <div className="volume-bars-wrapper">
            <div className="volume-bars">
              <svg width="80" height="75" id='svgroot'>

              <clipPath id='volume'>
                <rect className='volume-bar one' x="5" y="32.28" width="11px" height="27.72px" style={style} rx='2'/>
                <rect className='volume-bar two' x="20" y="23.3" width="11px" height="36.3px" style={style} rx='2'/>
                <rect className='volume-bar three' x="35" y="14.46" width="11px" height="45.54px" style={style} rx='2'/>
                <rect className='volume-bar four' x="50" y="5.8" width="11px" height="54.2px" style={style} rx='2'/>
                <rect className='volume-bar five' x="65" y="0" width="11px" height="60px" style={style} rx='2'/>
              </clipPath>
              <rect x="0" y="0" width="0" height="120" className='liquid'
                    clipPath="url(#volume)"/>
              <rect id='clipped' x="0" y="0" width="78" height="120" className='slider'
                    clipPath="url(#volume)"/>
              <foreignObject x="0" y="0" width="75" height="120">
                <div id='phantom' xmlns="http://www.w3.org/1999/xhtml"></div>
              </foreignObject>
              </svg>
            </div>
        </div>

    </div>
    )
  }
});

export default Volume;