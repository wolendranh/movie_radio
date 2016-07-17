"use strict";

  var Player = class Player {
    constructor(playButton, pauseButton, playerContainer) {
      const play = playButton;
      const pause = pauseButton;
      const player = playerContainer;

      $(pauseButton).hide();

      $(play).click(function () {
        $(player)[0].play();
        $(this).hide();
        $(pause).show();

      });

      $(pause).click(function () {
        $(player)[0].pause();
        $(this).hide();
        $(play).show();
      });
    }
  };
