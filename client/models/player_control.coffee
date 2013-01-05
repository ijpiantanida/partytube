class PlayerActionControl
  constructor: (@player) ->
    Events.on("list-selected",(list)=>@list = list)
    Events.on("user-id-changed",(user_id)=>@user_id = user_id)
  play: ->
    PlayerStatus.fromDocument(key: "PLAY", list_id: @list._id, user_id: @user_id, created_at: Date.now()).save();
    @player.play()
  pause: ->
    PlayerStatus.fromDocument(key: "PAUSE", list_id: @list._id, user_id: @user_id, created_at: Date.now()).save();
    @player.pause()
  playSong: (song) ->
    list = List.findById(song.list_id)
    list.currently_playing = song._id
    list.save()
    PlayerStatus.fromDocument(key: "PLAY_SONG", list_id: @list._id,payload: {song_id: song._id}, user_id: @user_id, created_at: Date.now()).save();
    @player.playSong(song)
