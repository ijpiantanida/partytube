Meteor.call("register_client", (error, result) -> Events.notify("user-id-changed", result) if result)
window.onload = ->
  Partytube.player = new YoutubePlayer(DomHelpers.youtubePlayer())
  Partytube.player_control = new PlayerActionControl(Partytube.player)
