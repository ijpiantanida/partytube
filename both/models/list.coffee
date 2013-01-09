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
  next_song: ->
    song_id = @song_at(@indexOfSong(Song.findById(@currently_playing)) + 1)
    Song.findById(song_id)
  next_song_of: (song) ->
    song_id = @song_at(@indexOfSong(song)+1)
    Song.findById(song_id)
  playNextSongOn: (player) ->
    next_song = @next_song()
    next_song.playOn(player);
    next_song
  with_next_song_do: (callback) ->
    callback(@next_song())
  with_next_song_of_do: (song, callback) ->
    callback(@next_song_of(song))
  song_at: (index) -> @songs[index%@songs.length]

