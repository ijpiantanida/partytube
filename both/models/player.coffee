class Player
	constructor: (@dom_player) ->
	play: (song) ->
		@currently_playing = song
		@dom_player.loadVideoById(song.youtube_id, 0,"small")
		
