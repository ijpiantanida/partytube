Meteor.publish("lists", ->
  Lists.find()
)

Meteor.publish("songs-of-list", (list_id) ->
  list = List.findById(list_id)
  list.currently_listening?= []
  list.currently_listening.push(@userId)
  list.update()
  @onStop =>
    console.log "Stopped, so I should remove #{@userId}"
    list.currently_listening.slice(list.currently_listening.indexOf(@userid),1)
    list.update()
  Songs.find(list_id: list_id)
)

Meteor.publish("player-status", (list_id) ->
  PlayerStatuses.find(list_id: list_id, created_at: {$gt: Date.now()})
)