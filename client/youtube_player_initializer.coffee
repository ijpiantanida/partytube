params = allowScriptAccess: "always"
atts = id: "myytplayer"
swfobject.embedSWF("http://www.youtube.com/v/qPOTEs_yTJo?enablejsapi=1&playerapiid=ytplayer&version=3",
"ytapiplayer", "425", "356", "8", null, null, params, atts);

onYouTubePlayerReady: (playerId) -> DomHelpers.youtubePlayer().addEventListener("onStateChange","onStateChange")
onStateChange: (state) -> Events.notify("song-finished") if state == 0