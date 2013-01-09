Meteor.call("register_client", (error, result) -> Events.notify("user-id-changed", result) if result)
