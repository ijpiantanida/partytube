class List extends Module
	@model: Lists
	@extend MeteorModel
	indexOfSong: (song) ->
		@songs.indexOf(song._id)
	removeSong: (song) ->
		@songs.splice(indexOfSong(song),1)

