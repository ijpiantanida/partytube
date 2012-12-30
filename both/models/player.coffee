class Player
  constructor: (@dom_player) ->
  playSong: (song) ->
	  @currently_playing = song
	  @dom_player.loadVideoById(song.youtube_id, 0,"small")
  pause: -> @dom_player.pauseVideo()
  play: -> @dom_player.playVideo()
