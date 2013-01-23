class Partytube

Events.on("finished-loading", ->
  Partytube.player = new YoutubePlayer(DomHelpers.youtubePlayer())
  Partytube.player_control = new PlayerActionControl(Partytube.player)
  session_saved_selected_list = Session.get("selected_list")
  Events.notify("list-selected",List.findById(session_saved_selected_list)) if session_saved_selected_list
)
Events.on("user-id-changed", (user_id) -> Partytube.user_id = user_id)
Events.on("user-id-changed", (user_id) -> Meteor.subscribe("lists"))
Events.on("list-selected", (list) -> Partytube.selected_list = list)
Events.on("list-selected", (list) -> Session.set("selected_list",list._id))

player_statuses_query_handler = undefined;
Events.on("list-selected", (list) ->
  player_statuses_query_handler.stop() if player_statuses_query_handler
  query = PlayerStatuses.find(list_id: list._id);
  player_statuses_query_handler = query.observe(
    added: (player_status, index) ->
      event_listener = new PlayerStatusEventListener(Partytube.my_user_id, Partytube.player)
      event_listener.notify(player_status)
  )
)
Events.on("list-selected", (list) -> Meteor.subscribe("songs-of-list", list._id))
songs_subscriptions_handler = undefined
Events.on("list-selected", (list) ->
  console.log "Tengo que romper el handler" if songs_subscriptions_handler
  songs_subscriptions_handler.stop() if songs_subscriptions_handler
  songs_subscriptions_handler = Meteor.subscribe("player-status", list._id, ->
    songToPlay = list.currently_playing or _.first(list.songs)
    Partytube.player.playSong(Song.findById(songToPlay)) if songToPlay
  )
)
Events.on("current-song-ended", (song_id) ->
  song = Song.findById song_id
  Partytube.selected_list.with_next_song_of_do(song,(next_song) ->
    next_song.update_list()
    Partytube.player_control.playSong(next_song)
  )
)