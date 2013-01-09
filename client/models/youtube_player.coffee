class YoutubePlayer
  constructor: (@dom_player) ->
  playSong: (song) ->
    $(@dom_player).attr("song_id", song._id)
    @dom_player.loadVideoById(song.youtube_id, 0,"small")
  pause: -> @dom_player.pauseVideo()
  play: -> @dom_player.playVideo()
