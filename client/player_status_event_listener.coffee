class PlayerStatusEventListener
  constructor: (@user_id, @player) ->
  call: (new_player_status) ->
    return if new_player_status.user_id == @user_id
    callback = _.detect(@all_callbacks(), (callback) => callback.can_manage(new_player_status))
    callback.apply(new_player_status)
  all_callbacks: ->
    [new PlayCallback(@player), new PauseCallback(@player), new PlayVideoCallback(@player)]

class BaseCallback
  constructor: (@player) ->
  can_manage: (player_status) -> player_status.key == @key()

class PlayCallback extends BaseCallback
  key: -> "PLAY"
  apply: (player_status) ->
    @player.play()

class PauseCallback extends BaseCallback
  key: -> "PAUSE"
  apply: (player_status) ->
    @player.pause()

class PlayVideoCallback extends BaseCallback
  key: -> "PLAY_SONG"
  apply: (player_status) ->
    song = Song.findById(player_status.payload.song_id)
    @player.playSong(song)