class Events
  @events = {}
  @on: (event, callback) ->
    @events[event] ?= []
    @events[event].push(callback)
  @notify: (event_name, args...) ->
    event(args...) for event in @events[event_name]