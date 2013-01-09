params = allowScriptAccess: "always"
atts = id: "myytplayer"
swfobject.embedSWF("http://www.youtube.com/v/qPOTEs_yTJo?enablejsapi=1&controls=1&disablekb=1&modestbranding=1&showinfo=0&playerapiid=ytplayer&version=3",
"ytapiplayer", "425", "356", "8", null, null, params, atts);

window.onYouTubePlayerReady = (playerId) ->
  DomHelpers.youtubePlayer().addEventListener("onStateChange","onStateChange")
  Events.notify("finished-loading")
window.onStateChange = (state) ->
  song_id = $(DomHelpers.youtubePlayer()).attr("song_id")
  Events.notify("current-song-ended", song_id) if state == 0