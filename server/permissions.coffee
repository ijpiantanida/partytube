always_allow = (anything...) -> true
Lists.allow({
  insert: always_allow
  update: always_allow
  remove: always_allow
})
Songs.allow({
  insert: always_allow
  update: always_allow
  remove: always_allow
})
PlayerStatuses.allow({
  insert: always_allow
  update: always_allow
})
