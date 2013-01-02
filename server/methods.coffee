Meteor.methods(
  register_client: ->
    user_id = Meteor.uuid()
    this.setUserId(user_id)
    user_id
)