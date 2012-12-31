class UrlMatcher
  matchs: (source) ->
    @regex().exec(source) != null
  match: (source) ->
    @regex().exec(source)[1]
  regex: -> /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i
