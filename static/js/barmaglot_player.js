var Player = class Player {
  constructor(playButton, pauseButton, playerContainer) {
    let play = playButton;
    let pause = pauseButton;
    let player = playerContainer;

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
