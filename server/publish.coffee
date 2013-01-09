Meteor.publish("lists", ->
  Lists.find()
)

Meteor.publish("songs-of-list", (list_id) ->
  Songs.find(list_id: list_id)
)

Meteor.publish("player-status", (list_id) ->
  PlayerStatuses.find(list_id: list_id, created_at: {$gt: Date.now()})
)