class List extends Module
	@extend(MeteorModel, {model: Lists})

	constructor: (name) ->
		@name = name
		@songs = []
		@created_at = Date.now()
	indexOfSong: (song) ->
		@songs.indexOf(song._id)
	removeSong: (song) ->
		@songs.splice(@indexOfSong(song),1)
		song.delete()
		@update()
	nextSong: ->
		song_index = (@indexOfSong(Song.findById(@currently_playing)) + 1)%@songs.length
		Song.findById(@songs[song_index])
	playNextSongOn: (player) ->
    @nextSong().playOn(player);

