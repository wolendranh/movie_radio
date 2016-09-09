import {render} from 'react-dom';
import React from 'react';

var Volume = React.createClass({

  propTypes: {
      classes: React.PropTypes.array,
      volumes: React.PropTypes.object
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
      var bars = this.props.classes.map((i, index) => {
      return <div key={index} className={this.getClass(i)} onClick={(evt) => this.soundHandler(i, evt)}></div>;
    });

    return (
    <div className="track-and-volume-wrapper">

        <div className="trackInfoWrapper">
            <div className="trackInfo marquee">
                   <p className="current-song">{this.props.song }</p>
            </div>
        </div>

        <div className="volume-bars-wrapper">
            <div className="volume-bars">
              {bars}
            </div>
        </div>

    </div>
    )
  }
});

export default Volume;