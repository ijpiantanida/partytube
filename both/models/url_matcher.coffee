class UrlMatcher
  matchs: (source) ->
    @regex().exec(source) != null
  match: (source) ->
    @regex().exec(source)[2]
  regex: -> /(.*\/)?watch\?.*v=(\w+)/
