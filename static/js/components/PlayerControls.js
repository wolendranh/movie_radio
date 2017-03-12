import {render} from 'react-dom';
import React from 'react';
import $ from 'jquery';

import PlayerStore from "../stores/PlayerStore.js"
import PlayerActions from "../actions/PlayerActions.js"

class Controls extends React.Component {
    constructor(props) {
      super(props);
      this.state = { showPause: false, showPlay: true , src: ''};
    }

    componentDidMount() {
        PlayerStore.addCanPlayListener(this._onCanPlay);
        PlayerStore.addPlayListener(this._onPlay);


        $('.shake').hover(
          function(){
            $(this).removeClass('finish-animation');
          }
        );

        $('.shake').mouseleave("mouseleave", function () {
            $(this).addClass('finish-animation');
        });
    }

    componentWillUnmount() {
            PlayerStore.removeCanPlayListener(this._onCanPlay);
            PlayerStore.removePlayListener(this._onPlay);
    }



    _onPlay = () => {
        if ((/mobile/i.test(navigator.userAgent))){
            return true
        }else {
            this.setState({showPause: false, showPlay: false});
        }
    }

    _onCanPlay = () =>  {
        if ((/mobile/i.test(navigator.userAgent))){
            return true
        }else {
            this.setState({showPause: true, showPlay: false});
        }
    }

    displayPause = () => {
        if ((/mobile/i.test(navigator.userAgent))){
            this.setState({showPause: true, showPlay: false});
        }

        var player = this.props.getPlayerRef();
        if(this.state.src != ''){
            player.src = this.state.src;
        }
        player.play();
    }
    displayPlay = () => {
        var player = this.props.getPlayerRef();
        // save current source to imitate Stop as browser API will literally 'pause' stream
        this.setState({ showPause: false , showPlay: true, src: player.src});
        player.src = '';
        player.pause();
    }

    render() {
        return (
          <div className="row player-controlls">
                  <div className="col-sm-4 col-sm-offset-4 shake">
                      <div id="spin-player" className="center-block"></div>
                      { this.state.showPlay ?
                          <div className="clickable-player-area play" onClick={this.displayPause }>

                            <div className="playback-play center-block"></div>
                          </div>
                      : null }


                      { this.state.showPause ?
                          <div className="clickable-player-area pause" onClick={ this.displayPlay }>
                            <div className="playback-pause center-block"></div>
                          </div>
                      : null }
                  </div>
          </div>
        )
    }
};


export default Controls;
