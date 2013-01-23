params = allowScriptAccess: "always"
atts = id: "myytplayer"
swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3&rel=0&modestbranding=1&fs=0&theme=light&iv_load_policy=3",
"ytapiplayer", "425", "356", "8", null, null, params, atts);

window.onYouTubePlayerReady = (playerId) ->
  DomHelpers.youtubePlayer().addEventListener("onStateChange","onStateChange")
  Events.notify("finished-loading")
window.onStateChange = (state) ->
  song_id = $(DomHelpers.youtubePlayer()).attr("song_id")
  Events.notify("current-song-ended", song_id) if state == 0