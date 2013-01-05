class PlayerActionControl
  constructor: (@player) ->
  play: ->
    PlayerStatus.fromDocument({key: "PLAY", list_id: selected_list()._id, user_id: my_user_id, created_at: Date.now()}).save();
    @player.play()
  pause: ->
    PlayerStatus.fromDocument({key: "PAUSE", list_id: selected_list()._id, user_id: my_user_id, created_at: Date.now()}).save();
    @player.pause()
  playSong: (song) ->
    PlayerStatus.fromDocument({key: "PLAY_SONG", list_id: selected_list()._id,payload: {song_id: song._id}, user_id: my_user_id, created_at: Date.now()}).save();
    @player.playSong(song)
