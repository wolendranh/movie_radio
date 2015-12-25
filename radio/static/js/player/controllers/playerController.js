var myApp = angular.module('playerController',[]);

myApp.controller('radioPlayerController',
    ["$sce", function ($sce) {
        this.config = {
            sources: [
          //{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg"},
          {src: $sce.trustAsResourceUrl("http://195.248.234.62:8000/radioskovoroda"), type: "audio/ogg"}
      ],
            theme: {
      url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
            }
        };
    }]
);