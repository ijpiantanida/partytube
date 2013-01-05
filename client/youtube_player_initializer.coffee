params = allowScriptAccess: "always"
atts = id: "myytplayer"
swfobject.embedSWF("http://www.youtube.com/v/qPOTEs_yTJo?enablejsapi=1&controls=0&disablekb=1&modestbranding=1&showinfo=0&playerapiid=ytplayer&version=3",
"ytapiplayer", "425", "356", "8", null, null, params, atts);

window.onYouTubePlayerReady = (playerId) -> DomHelpers.youtubePlayer().addEventListener("onStateChange","onStateChange")
window.onStateChange = (state) ->
  console.log("State changed to #{state}")
  Events.notify("song-finished") if state == 0