class Partytube

Events.on("user-id-changed", (user_id) -> Partytube.user_id = user_id)
Events.on("list-selected", (list) -> Session.set("selected_list",list._id))
Events.on("list-selected", (list) ->
  songToPlay = list.currently_playing or _.first(list.songs)
  Song.findById(songToPlay).playOn(Partytube.player) if songToPlay
)

player_statuses_query_handler = undefined;
Events.on("list-selected", (list) ->
  player_statuses_query_handler.stop() if player_statuses_query_handler
  query = PlayerStatuses.find(list_id: list._id, created_at: {$gt: Date.now()});
  player_statuses_query_handler = query.observe(
    added: (player_status, index) ->
      event_listener = new PlayerStatusEventListener(Partytube.my_user_id, Partytube.player)
      event_listener.notify(player_status)
  )
)